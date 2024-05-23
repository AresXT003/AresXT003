#include "shiftIn.h"
#define dataPin  2  /* Q7 */
#define clockPin  3 /* CP */
#define latchPin  4
#define n 2 // NO OF INPUT REGISTERS

const int led = 8;
const int led1 = 9;

shiftin test=shiftin( latchPin,  clockPin,  dataPin,  n);

void setup() {
  Serial.begin(9600);
 pinMode(led, OUTPUT);
  pinMode(led1, OUTPUT);
}

void loop() {
  // Serial.println(test.pin(9));
  if(test.pin(10)==HIGH)
  {
    digitalWrite(led1,HIGH);
  }else{
    digitalWrite(led1,LOW);
  }


  if(test.pin(16)==HIGH)
  {
    digitalWrite(led,HIGH);
  }else{
    digitalWrite(led,LOW);
  }
  // put your main code here, to run repeatedly:

}
