from math import exp, pi
import random

MAXLEVEL = 100

class Difficulty:
  def __init__(self):
    self.currentPoint = 0
    self.currentLevel = 1
    self.rows = 0
    self.a = 4
    self.weights = [1,0,0,0]
    self.setWeights()

  def getCurrentpoint(self):
    return self.currentPoint

  def getCurrentLevel(self):
    return self.currentLevel

  def getWeights(self):
    return self.weights

  def getNDV(self, x):
    b = (4/MAXLEVEL * self.currentLevel)
    return (1/(self.a * (2 * pi)**1/2)) * exp(-0.5 * ((x-b)/self.a)**2)

  def getDifficulty(self):
    difficulty = random.choices([1,2,3,4], self.weights, k = 1)
    return difficulty[0]

  def setWeights(self):
    for i in range(4):
      self.weights[i] = self.getNDV(4/3 * i) * MAXLEVEL

  def changeRow(self, x):
    if x == False and self.rows > 0:
      self.rows = 0
    elif x== True and self.rows < 0:
      self.rows = 0
    if x == True:
      self.a = 4
      self.currentPoint = 0
      self.rows += 1
    else:
      self.rows -= 1

  def addExtraPoints(self, x):
    self.currentPoint += x * 30

  def check(self):
    if self.currentPoint >= 100 and self.currentLevel < 100:
      self.currentPoint = self.currentPoint % 100
      self.currentLevel += 1
    elif self.currentPoint <= -100 and self.currentLevel > 1:
      self.currentPoint = self.currentPoint % 100
      self.currentLevel -= 1
    elif self.currentPoint < 0 and self.a > 0.1:
      self.a -= 0.1

  def adjust(self):
    if self.rows >= 3 or self.rows <= -3:
      self.addExtraPoints(self.rows//3)
    self.check()
    self.setWeights()

if __name__ == "__main__":
  adjust = Difficulty()
  while (True):
    x = int(input(">"))
    if x == 1:
      answer = True
    elif x == 0:
      answer = False
    elif x == "quit":
      quit()
    adjust.changeRow(answer)
    adjust.adjust()
    print("Row:",adjust.rows)
    print("Current Level:",adjust.currentLevel)
    print("Current Point:",adjust.currentPoint)
    print("Ratio:",adjust.weights)
    print("Difficulty:",adjust.getDifficulty())