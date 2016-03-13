const s3 = 'https://s3-ap-southeast-1.amazonaws.com/makersofbangkok';

export default (props) => {
  return <section id="what-its-about">
    <div className="container">
      <div className="row">
        <h1>About</h1>
        <div className="col-sm-8 col-sm-offset-2">
          <div className="section-subheader">
            <img id="jan" src={`${s3}/jan_circle.png`} />
          </div>
          <div className="about-title">
            Hey there!
          </div>
          <div className="section-text text-center">
            <p>
              I'm Jan, an entrepreneur and software developer living in Bangkok.
            </p>
            <p>
              Makers of Bangkok is my way of bringing amazing creative people
              together, let them have great conversations, create lasting
              connections, and make things happen with each other's help.
            </p>
            <p>
              Do you feel like traditional mass networking events, smalltalk,
              exchanging business cards are a waste of time? So do I, but
              it doesn't have to be that way.
            </p>
            <p>
              With Makers of Bangkok, we're creating a diverse network of
              people who do things differently.
              Join us and help us grow this unique community capable of great
              things!
            </p>
            <p>
              Can't wait to meet you at our next event :)
            </p>
          </div>
          <div className="cta text-center">
            <a href="#" className="btn btn-main" onClick={props.openModal}>
              Join Us!
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>;
};
