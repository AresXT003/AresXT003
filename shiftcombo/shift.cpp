#include "Arduino.h"
#include "shift.h"

shift::shift(int latch, int clock, int data, int num) {  //Class shift constructer for pin declaration
  _latchPin = latch;                                         //latchpin
  _clockPin = clock;                                         //clockpin
  _dataPin = data;                                           //datapin
  _n = num;                                                       // no of shift registers
  pinMode(_dataPin, OUTPUT);
  pinMode(_clockPin, OUTPUT);
  pinMode(_latchPin, OUTPUT);
}

long shift::inputON(int number) {  // class shift instance for inputON pins
  int i = 1;
  if (number > 8) {  // Checks the pin number is larger than 8 to avoid missing of pins 9 and 10 due to shift register has 8 pins
    int num = number;
    while ((8 * i) < num) {  //here we add +2 number if the value is greater than 8 if it is more than 16 then we add +2 again and so on .while loop checks condition where the pin value is greater than the multiple of 8
      number += 2;
      i++;
    }
  }
  // Serial.println(number);
  int x = number / 10;  // The result is added to x position of array
  int y = number % 10;  // The reminder is added to y position of array and --y is beacuse array starts at 0 so we put pin 1 it will be second elemnt of array so it is done to avoid that
  a[x][--y] = 1;
  //  Serial.println(x);
  //  Serial.println(y);
  disp();  // calling the display function
}

long shift::inputOFF(int numb) {  // class shift instance for inputOFF pins
  int i = 1;
  if (numb > 8) {  // Checks the pin number is larger than 8 to avoid missing of pins 9 and 10 due to shift register has 8 pins
    int num = numb;
    while ((8 * i) < num) {  //here we add +2 number if the value is greater than 8 if it is more than 16 then we add +2 again and so on .while loop checks condition where the pin value is greater than the multiple of 8
      numb += 2;
      i++;
    }
  }
  // Serial.println(number);
  int x = numb / 10;  // The result is added to x position of array
  int y = numb % 10;  // The reminder is added to y position of array and --y is beacuse array starts at 0 so we put pin 1 it will be second elemnt of array so it is done to avoid that
  a[x][--y] = 0;
  disp();  // calling the display function
}
long shift::disp() {
  uint8_t k;
  digitalWrite(_latchPin, LOW); // setting latch pin low before sending values to shift register
  for (t = _n; t >= 0; t--) { // loop to print 2d array
    for (j = 0; j < 8; j++) {

      if (a[t][j] == 1) {
        k |= a[t][j] << j;
      }

      // Serial.print(a[i][j]);
    }
    // Serial.println(" ");
    //  Serial.println(k);
    shiftOut(_dataPin, _clockPin, MSBFIRST, k);// Assigning value to shift register
    k = 0;
  }
  digitalWrite(_latchPin, HIGH);// Setting latch pin to high after sending the values to shift register
}
