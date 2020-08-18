import React from 'react';
function Footer(){
    return (
        <footer>
            <div className="text-center center-block">
                <p className="txt-railway" style={{color:"#3e64ff"}}>Made with <span role="img" aria-label="heart">💚</span> by Sushant</p>
                <br />
                <a href="https://www.facebook.com/sushantkumar.rai.31"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
	            <a href="https://www.linkedin.com/in/sushant-kumar-rai-26a5491a6/"><i id="social-tw" className="fa fa-linkedin-square fa-3x social"></i></a>
	            <a href="https://github.com/sushant2308?tab=repositories"><i id="social-gp" className="fa fa-github-square fa-3x social"></i></a>
	            <a href="mailto:sushantr.ug18.ee@nitp.ac.in"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
            </div>
            
        </footer>
    );
}
export default Footer;