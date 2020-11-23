import React from "react";
import "./style.css";
import michael from "../../assets/michael.png"
import fernando from "../../assets/fernando.PNG"
import maxx from "../../assets/maxx.png"
import jonathan from "../../assets/jonathan.png"
function AboutDiv(props) {
    return (




        <div>
            <div className="jumbotron jumbotron-fluid" id="header">
                <div>
                    <h1 className="display-4">One Man's Trash [OMT]</h1>
                    <h3>Destress, Declutter, & Develope</h3>
                    <p className="lead">Here at  we aim to give you a
                    platform FOR FREE. We believe in the saying, "One Man's Trash is another Man's Treasure." Now more than
                    ever is the perfect time to start relying on our neighbors rather than huge corporations and the
                    government to provide us with goods and services we are in search of. OMT is the perfect marketplace to
      exchange goods, services, and skills for other goods, services, and skills. </p>
                </div>
            </div>

            <br />

            <div id="howBanner" className="container">
                <div className="col">




                    <h2>how it works</h2>


                    <div className="col">
                        <iframe src="https://www.youtube.com/embed/Y8zh1fIaneY" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>

                </div>

            </div>
            <br /><br />

            <div id="devBanner" className="container">
                <div className="row">
                    <div id="descriptionLeft" className="col-md-3 col-sm-6">

                        <h3>who we are</h3>
                        <p>OTM's Dev Team is comprised of 4 hard working and determined UCI Full Stack Bootcamp Graduates
                        looking to make a difference in the world. Each member is highly skilled in their specific role with
          a strong focus on consumer satisfaction. We're here for you!</p>
                    </div>

                    <div id="devCards" className="col">

                        <div className="container">
                            <div className="row">
                                <div className="col devCard">
                                    <img src= { michael } className="devPics" alt="" srcSet="" />
                                    <address>
                                        <a href="mailto:trujillom9@gmail.com">Michael Trujillo</a><br />
                                        <a href="https://www.linkedin.com/in/michael-trujillo-017696188/" target="_blank"
                                            rel="noopener noreferrer">Linked in</a>
                                        <br />
                                        <a href="https://github.com/michaeltrujillo" target="_blank"
                                            rel="noopener noreferrer">Github</a>
                                        <br />
                      Irvine, CA
                      <br />
                      Front-End Team
                  </address>
                                </div>
                                <div className="col devCard">

                                    <img src= {maxx} className="devPics" alt="" srcSet="" />
                                    <address>
                                        <a href="mailto:maxxsanner105@gmail.com">Maxx Sanner</a><br />
                                        <a href="https://www.linkedin.com/in/maxx-sanner-49247b169" target="_blank"
                                            rel="noopener noreferrer">Linked in</a>
                                        <br />
                                        <a href="https://github.com/Maxx105" target="_blank"
                                            rel="noopener noreferrer">Github</a>
                                        <br />
                      Huntington Beach, CA
                      <br />
                      Back-End Team
                  </address>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col devCard">

                                    <img src= {fernando} className="devPics" alt="" srcSet="" />
                                    <address>
                                        <a href="mailto:fangulo82@gmail.com">Fernando Angulo Donoso</a><br />
                                        <a href="http://www.linkedin.com/in/fernando-angulo-donoso-b3749026" target="_blank"
                                            rel="noopener noreferrer">Linked in</a>
                                        <br />
                                        <a href="https://github.com/Fer82" target="_blank" rel="noopener noreferrer">Github</a>
                                        <br />
                      Newport Beach CA
                      <br />
                      Front-End Team
                  </address>
                                </div>
                                <div className="col devCard">

                                    <img src= {jonathan} className="devPics" alt="" srcSet="" />
                                    <address>
                                        <a href="mailto:jonathanhui.hk@gmail.com">Jonathan Hui</a><br />
                                        <a href="https://www.linkedin.com/in/jonathan-hui-b492421a1/" target="_blank"
                                            rel="noopener noreferrer">Linked in</a>
                                        <br />
                                        <a href="https://github.com/michaeltrujillo" target="_blank"
                                            rel="noopener noreferrer">Github</a>
                                        <br />
                      San Ramon CA
                      <br />
                      Back-End Team
                  </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
export default AboutDiv;