import React, { useRef } from 'react';

import {MountainSvg} from '../assets/svgs/svgs';
import Button from '../shared/components/formElements/Button';
import {ArrowDownSvg, ColumnDividor, ProbQnMrkSvg, SlnLightSvg} from '../assets/svgs/svgs';
import Card from '../shared/components/UIElements/Card';
import Footer from '../shared/components/UIElements/footer';
import './welcome.css';

const WlcmPage = () => {
    const myRef = useRef(null);

    const scrollToRef = (ref) => {
        window.scrollTo(0, ref.current.offsetTop)
    }

    const executeScroll = () => scrollToRef(myRef);

    return (
        <div className="main-wlcm">
            <div className="mount-container">
                <div className="text">
                    <h1>Welcome to Signcamp!</h1>
                    <p>You've got much  opportunity to reveal all traffic
                        road signs with the Sign<span>Detect</span> app...
                    </p>
                    <Button type="button" whiteBg onClick={executeScroll}><ArrowDownSvg /> Read more</Button>
                </div>
                <div className="mountRange">
                    <MountainSvg />
                </div>
            </div>
            <div ref={myRef} className="prob-soln">
                <Card>
                    <div className="prob-soln--center">
                        <h1>Existing problem</h1>
                        <ProbQnMrkSvg />
                    </div>
                    <p>
                        For years and years, it's been very problematic to recognise various traffic signs at the right time needed. 
                        Sometimes, this has even resulted into road accidents leading to property destruction, money loss while trying 
                        to restore or repair the destructed properties.
                    </p>
                    <p>
                        The solution to this problem comes also as a supporting 
                        agent to the Rwandan Government's effort to develop Made 
                        In Rwanda products.
                    </p>
                </Card>
                <div className="separator"><ColumnDividor /></div>
                <Card>
                    <div className="prob-soln--center">
                        <SlnLightSvg />
                    </div>
                    <h1>Our solution to the problem</h1>
                    <p>
                        In a bid to provide a suitable solution to the stated problem,
                        we developed the SignDetect app which will ease the proce
                        ss of recognizing the desired traffic sign. This will also provi
                        de a quick solution because once the concerned person uplo
                        ads the image of the traffic sign, he/she will only have to click
                        a single button and then he/she will get the appropriate info
                        on that sign.
                    </p>
                    <Button to="/test" type="button" blueBg>Checkout the solution</Button>
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default WlcmPage;