import "./CSS/EmployeeOfTheMonthCSS.css";
import Prize from "./Prize";
export default function Prizes(){
   return( 
    <section class="item">
        <h4>Prizes</h4>
        <Prize/>
        <Prize/>
        <Prize/>
    </section>
   );
}