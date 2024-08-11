import "./CSS/nominate.css";
import "./CSS/nominate2.css";

const Nominate = () =>{
    return(
        <div class="container">
        <section class="form-section">
            <h2>Nominate a Colleague</h2>
            <form id="nominate-form" action="#" method="post">
                <div class="form-group">
                    <label for="nominee-name">Nominee's name*</label>
                    <input type="text" id="nominee-name" name="nominee-name"/>
                </div>
                <div class="form-group">
                    <label for="nominee-email">Nominee's email*</label>
                    <input type="email" id="nominee-email" name="nominee-email"/>
                </div>
                <div class="form-group">
                    <label for="nomination-reason">Reason for nomination*</label>
                    <textarea id="nomination-reason" name="nomination-reason" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label for="your-name">Your name*</label>
                    <input type="text" id="your-name" name="your-name"/>
                </div>
                <div class="form-group">
                    <label for="your-email">Your email*</label>
                    <input type="email" id="your-email" name="your-email"/>
                </div>
                <div class="cont">
                    <button type="submit" class="btny">
                        <span>Submit</span>
                        <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" alt="Submit Icon"/>
                    </button>
                </div>
            </form>
        </section>
    </div>
    );
}
export default Nominate;