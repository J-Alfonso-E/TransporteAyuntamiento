import React, { useState } from 'react';
import { RegistrarAsistencia } from './RegistrarAsistencia.js';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import { LeyendaRegistro } from '../Componentes/LeyendaRegistro.js';

//import HowToUse from './HowToUse.jsx'

const horaRender =  new Date();
let timestamp;
const token = "bc3d6d9ee482525d0ae17b28b7fd2778";


class LectorQR extends React.Component {

    
    
    constructor(props) {
        super(props);
        this.state = {
            decodedResults: []
        }

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
        //console.log(this.onNewScanResult);

        //timestamp = new Date();
    }

    


    render() {

        if(horaRender - timestamp > 600000 || isNaN(horaRender - timestamp)){
            return (
                <div className="App">
                    <section className="App-section">
                        {/*<div className="App-section-title"> Html5-qrcode React demo</div>*/}
                        <br />
                        <br />
                        <br />
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={250}
                            disableFlip={false}
                            qrCodeSuccessCallback={this.onNewScanResult} />
                        <ResultContainerPlugin results={this.state.decodedResults} />
                        
                    </section>
                </div>
            );
        }
        else {
            console.log(horaRender);
            console.log(timestamp);
            console.log(isNaN( horaRender - timestamp) );
            setTimeout(function () {
                
                window.location.reload();
            }, 10000)
            return (
                <LeyendaRegistro />
            )
        }


        
    }




    onNewScanResult(decodedText, decodedResult) {
        console.log(
            "App [result]", decodedResult);

            console.log(decodedResult);
            
            if(decodedResult.decodedText === token){
                console.log("Tiene Que hacer el registro");
                RegistrarAsistencia();
                timestamp = new Date();
            }
            else {
                alert("Codigo QR No valido");
                
            }
            //

        // let decodedResults = this.state.decodedResults;
        // decodedResults.push(decodedResult);
        this.setState((state, props) => {
            state.decodedResults.push(decodedResult);
            return state;
        });
    }
}

export default LectorQR;
