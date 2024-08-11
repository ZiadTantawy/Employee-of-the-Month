import React from "react";
import Employees from "./Employees.jsx";
import Prizes from "./Prizes.jsx";
import NavBar from "./navbar.js"
export default function EmployeeOfTheMonthPage(){
   return (
    <>
    <NavBar/>
    <body>
        <Employees></Employees>
        <Prizes></Prizes>
    </body>
    </>
   );
}
