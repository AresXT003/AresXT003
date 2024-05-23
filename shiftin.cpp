#include "Arduino.h"
#include "shiftIn.h"

shiftin::shiftin(int latchPin, int clockPin, int dataPin, int n) {  //Class shift constructer for pin declaration
  _latchPin = latchPin;                                         //latchpin
  _clockPin = clockPin;                                         //clockpin
  _dataPin = dataPin;                                           //datapin
  _n = n; 
  num=_n*8;                                                      // no of shift registers
  pinMode(_dataPin, INPUT);
  pinMode(_clockPin, OUTPUT);
  pinMode(_latchPin, OUTPUT);
}
int shiftin::pin(int pin){
   digitalWrite(_latchPin, LOW);
  digitalWrite(_latchPin, HIGH);
   for (int i = 0; i < num; i++) {
    int bit = digitalRead(_dataPin);
    if (bit == HIGH) {
      a[i] = 0;
    } else {   
      a[i] = 1;
    }
    // Serial.print(a[i]);
    digitalWrite(_clockPin, HIGH);  // Shift out the next bit
    digitalWrite(_clockPin, LOW);
  }
  // Serial.println();
  p=--pin;
  if(a[p]==1){
    stat=HIGH;
  }else{
    stat=LOW;
  }
  return stat;
}