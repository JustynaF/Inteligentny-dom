#define lampka 11
bool stan_obecny = 0;

void setup() {                
  Serial.begin(9600);
  delay(500);
  delay(1000);
  pinMode(lampka, OUTPUT); 
  digitalWrite(lampka, LOW);
  stan_obecny =0 ;
}
 
char zmienna;

void loop() {
   if(Serial.available()){
    zmienna = char(Serial.read());
    if(zmienna == '0'){
      // wylczenie diody
      digitalWrite(lampka, LOW);
      Serial.println("Light OFF");
      stan_obecny = 0;
    }
    else if(zmienna == '1'){
      //wlaczenie diody
      digitalWrite(lampka, HIGH);
      Serial.println("Light ON");
      stan_obecny = 1;
    }
    else if(zmienna == 's')
     {
        Serial.println(stan_obecny);
     }
  }
}
