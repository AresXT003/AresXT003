#ifndef shift_h
#define shift_h
#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif
#include "pins_arduino.h"

#include <inttypes.h>

class shift {
public:
  shift(int latch, int clock, int data, int num);
  long inputON(int number);
  long inputOFF(int numb);
  long disp();
private:
  int _latchPin, _clockPin, _dataPin, _n;
  int number;
  int t, j, x, y;
  // byte b;
  int a[20][8] = {};
};
#endif