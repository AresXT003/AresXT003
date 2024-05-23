#include "shift.h"
#include "shiftin.h"

#define latchPin_1 9
// SH_CP pin 11
#define clockPin_1 10
// DS pin 14
#define dataPin_1 8
#define n_1 6

#define dataPin 2  /* Q7 */
#define clockPin 3 /* CP */
#define latchPin 4
#define n 2  // NO OF INPUT REGISTERS
shiftin test(latchPin, clockPin, dataPin, n);
shift swf(latchPin_1, clockPin_1, dataPin_1, n_1);

int a=250;


void setup() {
  Serial.begin(9600);
}

void loop() {
 
  if (test.pin(16) == HIGH) {
    // a=0;
    while (test.pin(10) == LOW) {
      swf.inputON(38);
      swf.inputON(4);
      delay(a);
      swf.inputOFF(4);
      swf.inputOFF(38);
      delay(a);
    }
  }
  if (test.pin(10) == HIGH) {
    // a=0;
    while (test.pin(16) == LOW) {
      swf.inputON(4);
      swf.inputOFF(38);
      delay(a);
      swf.inputOFF(4);
      swf.inputON(38);
      delay(a);
    }
  }
  if ((test.pin(16) == HIGH) && (test.pin(10) == HIGH)) {
    swf.inputOFF(4);
    swf.inputOFF(38);
  }
}
