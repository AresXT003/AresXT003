#ifndef shiftIn_h
#define shiftIn_h
#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif
#include "pins_arduino.h"

#include <inttypes.h>

class shiftin {
public:
  shiftin(int latchPin, int clockPin, int dataPin, int n);
  int pin(int pin);
private:
  int _latchPin, _clockPin, _dataPin, _n;
  int p,num,stat;
  int a[] ;
};
#endif