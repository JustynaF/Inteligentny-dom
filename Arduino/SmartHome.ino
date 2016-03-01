#include <dht.h>

#define RELAY1  8   
#define pin 2 // Analog Pin sensor is connected to
 
dht DHT;

bool state = 0;

void setup()
{    
  Serial.begin(9600);
  delay(500);//Delay to let system boot
  delay(1000);//Wait before accessing Sensor
  pinMode(RELAY1, OUTPUT);
  digitalWrite(RELAY1, LOW);
  state = 0;
}

char ch;

void loop()
{
  if(Serial.available())
  {
     ch = char(Serial.read());

     if(ch == '0')
     {
       digitalWrite(RELAY1, LOW);           // Turns ON Relays 1
       Serial.println("Light OFF");
       state = 0;
       delay(2000);                         // Wait 2 seconds
     }
     else if(ch == '1')
     {
       digitalWrite(RELAY1, HIGH);          // Turns Relay Off
       Serial.println("Light ON");
       state = 1;
       delay(2000);
     }
     else if(ch == 's')
     {
        Serial.println(state);
     }

     else if(ch == 't')
     {
          DHT.read11(pin);
          Serial.println(DHT.temperature);
     }
     else if(ch == 'w')
     {
          DHT.read11(pin);
          Serial.println(DHT.humidity);
     }
  }
}
