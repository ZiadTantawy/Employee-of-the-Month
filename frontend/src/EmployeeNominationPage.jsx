import './CSS/EmployeeNominationCSS.css'
import Nominee from './Nominee';
import Profile from './profile';
export default function nominate(){
    function nominate(){
        window.location.href = "/nominate";
    }
    return (
        <>
            <main class="nomination">
                <h1>Nomination</h1>
                <small>
                    Employees can nominate their colleagues for employee of the month.
                    Nominations are anonymous. You can also nominate employees
                    yourself.
                </small>
                <div class="nominationContainer" style={{"margin-top": "20px", "margin-bottom": "10px"}}>
                    <button
                    class="photo"
                    style={{"border-radius": "8px", "background-color": "rgb(231, 231, 231)", width:"40px", height:"40px", fontSize:"16px"}}
                    onClick={nominate}
                    >
                    +
                    </button>
                    <div class="info">
                        <h4>Nominate employees</h4>
                        <small>You can nominate up to 3 employees this month</small>
                    </div>
                </div>
            <Nominee/>
            <Nominee/>
            <Nominee/>
            <div>
                <br />
                <button class="redButton">Save</button>
                <button class="cancelButton">Cancel</button>
                <br /><br />
            </div>
            <h4>Previous Nomination</h4>
            <Nominee/>
            <Nominee/>
            <Nominee/>
            </main>
            

        </>
    );
}