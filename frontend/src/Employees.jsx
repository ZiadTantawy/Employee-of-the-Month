import "./CSS/EmployeeOfTheMonthCSS.css";
import EmployeeCard from "./EmployeeCard";

export default function employees(){
    return (
        <main className="item">
            <h1>Employee Of the Month</h1>
            <small>Vote for your favorite employee</small>
            <div style={{display:"flex", "flex-direction": "column"}}>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
            </div>
        </main>
    );
}