import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Topbar from './components/Topbar';
import Home from './pages/Home';
import TopicSelector from './pages/TopicSelector';
import DifficultySelector from './pages/DifficultySelector';
import Question from './components/Question';
import Answer from './components/Answer';
import Stats from './pages/Stats';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  background-color: #B8B7B2;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15fr 70fr 15fr;
  grid-template-columns: 20fr 60fr 20fr;
`

const Container = styled.div`
  background-color: #B8B7B2;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 10fr auto;
`

const QuestionContainer = styled(motion.div)`
  margin: 2.5rem 2.5rem 2.5rem;
  padding: 2rem;
  background: #6D8EA0;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  height: 75vh;
  display: grid;
  grid-template-rows: 60% 40%;
  align-items: stretch;
  align-content: stretch;
  gap: 1rem;
`

function App() {
  const [mode, setMode] = useState(null)
  const [username, setUsername] = useState("user")
  const [topics, setTopics] = useState(null)
  const [question, setQuestion] = useState({
    number: 0,
    type: ''
  })
  const [stopwatch, setStopwatch] = useState(0)
  const [started, setStarted] = useState(false)
  const [difficulty, setDifficulty] = useState(null)
  const [testId, setTestId] = useState(null)
  const [infiniteId, setInfiniteId] = useState(null)
  const [questionId, setQuestionId] = useState(null)
  const [overlay, setOverlay] = useState(null)
  const [totalQuestions, setTotalQuestions] = useState(5)
  const [testStats, setTestStats] = useState(null)
  const [testHistory, setTestHistory] = useState(null)

  const goHome = () => {
    setMode(null)
    setTopics(null)
    setDifficulty(null)
    setStarted(false)
    setTestId(null)
    setInfiniteId(null)
    setQuestionId(null)
    setQuestion({
      number: 0,
      type: ''
    })
    setDifficulty(null)
    setTestStats(null)
    setTestHistory(null)
    // setTotalQuestions(5)
    setStopwatch(0)
  }

  const startTest = (types) => {
    setTopics(types)
    axios.post('http://localhost:12345/api/start_test', {
      username: username,
      question_types: types,
      difficulties: difficulty,
      no_questions: totalQuestions
    })
      .then((res) => {
        setTestId(res.data.test_id)
        setStarted(true)
      })
  }

  const startInfinite = (types) => {
    setTopics(types)
    setTotalQuestions(100000)
    axios.post('http://localhost:12345/api/start_infinite', {
      question_types: types
    })
      .then((res) => {
        setInfiniteId(res.data.infinite_id)
        setStarted(true)
        // startStopwatch()
      })
  }

  const getQuestion = () => {
    if (testId || infiniteId) {
      axios.post('http://localhost:12345/api/get_question', {
        test_id: testId,
        infinite_id: infiniteId
      })
        .then((res) => {
          setQuestion({
            id: res.data.id,
            number: question.number + 1,
            type: res.data.type,
            display: res.data.display,
            inputType: res.data.input_type,
            cols: res.data.matrix_columns,
            rows: res.data.matrix_rows
          })
          setQuestionId(res.data.id)
        })
    }
  }

  useEffect(() => {
    if (testId || infiniteId) {
      getQuestion()
    }
  }, [testId, infiniteId])

  const getHistory = () => {
    axios.post('http://localhost:12345/api/test_history', {
      username: username
    })
      .then((res) => {
        setTestHistory(res.data.history)
      })
  }

  const endTest = () => {
    axios.post('http://localhost:12345/api/end_test', {
      test_id: testId
    })
      .then((res) => {
        console.log(res.data)
        setTestStats({
          questionsAnswered: res.data.no_questions_answered,
          questionsCorrect: res.data.no_questions_correct,
          seconds: res.data.no_seconds
        })
        getHistory()
        setStarted(false)
      })
  }

  const submitAnswer = (answer) => {
    axios.post('http://localhost:12345/api/submit_answer', {
      test_id: testId,
      infinite_id: infiniteId,
      question_id: questionId,
      input: answer
    })
      .then((res) => {
        res.data.correct === 'true' ? setOverlay("Correct") : setOverlay("Incorrect")
        setTimeout(() => setOverlay(null), 1000)
        question.number < totalQuestions ? getQuestion() : setTimeout(() => endTest(), 900)
      })
  }

  const handleStart = (topics) => {
    if (mode === 'test') {
      startTest(topics)
    }
    if (mode === 'infinite') {
      startInfinite(topics)
    }
  }

  useEffect(() => {
    let interval = null
    if (started) {
      interval = setInterval(() => {
        setStopwatch(stopwatch => stopwatch + 1)
      }, 1000)
    } else if (!started && stopwatch !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [started, stopwatch])

  if (!mode) {
    return (
      <HomeContainer>
        <Home setMode={setMode} setUsername={setUsername} />
      </HomeContainer>
    )
  } else {
    return (
      <Container>
        <Topbar username={username} goHome={goHome} />
        {mode === 'test' && !difficulty && <DifficultySelector setDifficulty={setDifficulty} totalQuestions={totalQuestions} setTotalQuestions={setTotalQuestions} />}
        {((mode==='test' && difficulty && !topics) || (mode==='infinite' && !topics)) && <TopicSelector setTopics={setTopics} handleStart={handleStart} />}
        {testStats && <Stats answered={testStats.questionsAnswered} correct={testStats.questionsCorrect} seconds={testStats.seconds} testHistory={testHistory} /> }
        {
          started && mode &&
          <QuestionContainer initial={{opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0.5 }}>
            <Question
              number={question.number}
              time={stopwatch}
              type={question.type}
              display={question.display}
              overlay={overlay}
            />
            <Answer
              questionNum={question.number}
              inputType={question.inputType}
              submitAnswer={submitAnswer}
              rows={question.rows}
              cols={question.cols}
            />
          </QuestionContainer>
        }
      </Container>
    )
  }
}

export default App;