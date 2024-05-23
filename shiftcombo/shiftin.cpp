#include "Arduino.h"
#include "shiftIn.h"

shiftin::shiftin(int latchPin, int clockPin, int dataPin, int n) {  //Class shift constructer for pin declaration
  _latch = latchPin;                                         //latchpin
  _clock = clockPin;                                         //clockpin
  _data = dataPin;                                           //datapin
  _z = n; 
  no=_z*8;                                                      // no of shift registers
  pinMode(_data, INPUT);
  pinMode(_clock, OUTPUT);
  pinMode(_latch, OUTPUT);
}
int shiftin::pin(int pin){
   digitalWrite(_latch, LOW);
  digitalWrite(_latch, HIGH);
   for (int q = 0; q < no; q++) {
    int bit = digitalRead(_data);
    if (bit == HIGH) {
      ar[q] = 0;
    } else {   
      ar[q] = 1;
    }
    Serial.print(ar[q]);
    digitalWrite(_clock, HIGH);  // Shift out the next bit
    digitalWrite(_clock, LOW);
  }
  Serial.println();
  p=--pin;
  if(ar[p]==1){
    stat=HIGH;
  }else{
    stat=LOW;
  }
  return stat;
}