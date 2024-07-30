#include <ESPWEBCONFIG.h>

ESPWEBCONFIG web(80);
void setup(){
 Serial.begin(115200);
  web.begin();
}
void loop(){
  if(web.loop()){

    // Loop items should be inside this loop
  web.println("Hello World");
 }
}