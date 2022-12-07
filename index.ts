#!usr/bin/env node

import inquirer from "inquirer";
import CurrencyConverter from "currency-converter-lt" ;
const CC = CurrencyConverter;

async function askQuestion(){
  console.clear();
  const userInput= await inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "currencyFrom",
        message: "\nFrom Currency\n",
        choices: [
          "AUD - Australian Dollar", 
          "GBP - Sterling Pound", 
          "EUR - Euro", 
          "USD - Dollar",
          "PKR - Pak Rupee",
          "JPY - Japanese Yen"],
      },
      {
        type: "list",
        name: "currencyTo",
        message: "\nTo Currency\n",
        choices: [
          "AUD - Australian Dollar", 
          "GBP - Sterling Pound", 
          "EUR - Euro", 
          "USD - Dollar",
          "PKR - Pak Rupee",
          "JPY - Japanese Yen"],
      },
      {
        type: "number",
        name: "howMuch",
        message: "Enter Amount to Convert: ",
      },
]);
let currency1 = userInput.currencyFrom.slice(0,3);
let currency2 = userInput.currencyTo.slice(0,3);
let amountToConvert = userInput.howMuch;


let currencyConverter = new CC(
  {
    from:currency1, 
    to:currency2, 
    amount:amountToConvert
  });

  async function awaitResponse (cb:any){    
    currencyConverter.convert().then((response:any) => {
    cb(response); //or do something else
    });
    };
    
    const callback = (data:number) => {
        console.log(data);
        startAgain();
    };
    
    await awaitResponse(callback);
    
    
    async function startAgain(){
           
            var again = await inquirer.prompt({
                type: "input",
                name: "restart",
                message: "Do you want more Currency Rates Y/N: ",
            });
            if (again.restart == "y" || again.restart == "Y"){
            askQuestion();
            }
            console.log("Thanks for using EsJay's Currency Converter.");
            };
        };
    await askQuestion();


