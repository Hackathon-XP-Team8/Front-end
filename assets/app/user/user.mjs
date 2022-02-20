import { Level } from "./level.mjs"
import { Controller } from "../../mvc/controller.mjs";

class User {
    constructor() {
        this.controller = new Controller();

        //this.controller.getRequest("", { url: "" }, (response) => this.level = new Level(response));

        this.level = new Level(500);

        this.balance = 1500;

        /*this.controller.getRequest(
            "https://hack-api-proud-marmot-hr.mybluemix.net/get",
            {
                url: "https://openapi.xpi.com.br/openbanking/bank/XP/users/JOAO/banks"
            },
            response => console.log(response),
            {
                contentType: "application/json"
            }
        );*/

        this.banks;
    }

    showBalance () {
        const balance = document.getElementById("balance")
        if (balance) {
            balance.textContent = this.balance;
        }
    }
}

export { User };