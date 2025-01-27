import Image from 'next/image';
import React from 'react';

import separatorLight from '../../public/assets/images/banner/separator-bottom-light.svg';
import separator from '../../public/assets/images/banner/separator-bottom.svg';
// import logoLight from '../../public/assets/images/logo/network_logo_dark.svg';
// import logoDark from '../../public/assets/images/logo/network_logo.svg';

function HomeNewsletter() {
  // const [ email, setEmail ] = useState('');
  // const [ submitted, setSubmitted ] = useState(false);

  // const handleInputChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setEmail(event.target.value);
  // };

  // // Handle form submission
  // const handleSubmit = (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   // console.log("Email submitted:", email);

  //   setSubmitted(true);

  //   setEmail('');

  //   setTimeout(() => setSubmitted(false), 3000);
  // };

  return (
    <div className="lightscan-newsletter">
      <div className="lsb-newsletter-separator">
        <Image
          src={ separator }
          width={ 1920 }
          height={ 98 }
          alt="Separator"
          className="for-dark w-100"
        />
        <Image
          src={ separatorLight }
          width={ 1920 }
          height={ 98 }
          alt="Separator"
          className="for-light w-100"
        />
      </div>
      { /* <div className="container">
        <div className="lsb-newsletter-main pt--50">
          <div className="logo">
            <Link href="/">
              <Image
                className="for-dark logo-light"
                src={ logoLight }
                width={ 221 }
                height={ 40 }
                alt="Lightscan Logo Light"
              />
              <Image
                className="for-light logo-light"
                src={ logoDark }
                width={ 221 }
                height={ 40 }
                alt="Lightscan Logo Light"
              />
            </Link>
            <h3 className="text-center newsletter-title">
              Subscribe To Our Newsletter
            </h3>
          </div>

          { submitted ? (
            <p className="thank-you-message text-center mb--20">
              Thank you for subscribing! We'll keep you updated.
            </p>
          ) : (
            <form
              className="lsb-banner-search style_2 mt--30"
              // eslint-disable-next-line react/jsx-no-bind
              onSubmit={ handleSubmit }
            >
              <div className="glow-wrap">
                <span className="glow-1"/>
              </div>

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={ email }
                // eslint-disable-next-line react/jsx-no-bind
                onChange={ handleInputChange }
              />
              <button className="lsb-btn-2" type="submit">
                <span className="btn-text">Subscribe</span>
              </button>
            </form>
          ) }

          <p className="lsb-newsletter-text text-center mt--15">
            Stay up to date with Lightscan
          </p>
        </div>
      </div> */ }
    </div>
  );
}

export default HomeNewsletter;
