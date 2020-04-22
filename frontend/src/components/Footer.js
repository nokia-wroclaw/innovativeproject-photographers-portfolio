import React from 'react';
import './Footer.css';

function Footer(){
    return (
        <footer className="footer text-center" style={{position:'fixed', bottom: '0', width:'100%', backgroundColor:'#3d3d3d'}}>
            <div className="container" style={{display: 'block'}}>
                <a class="footer" style={{float: 'left'}} href="#">Privacy</a>
                <a class="footer" href="#">About</a>
                <a class="footer" style={{float: 'right'}}href="#">Terms of use</a>
            </div>
        </footer>
    );
}

export default Footer;