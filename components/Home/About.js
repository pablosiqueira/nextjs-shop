const About = props => {
    return(
        <section className="text-center my-4" style={{backgroundImage:'/pexels-pixabay-209977.jpg'}}>
        <h3 className="my-4">About the Project</h3>
        <p>This project was made using the Next JS framework with a MongoDB Atlas database as the source for the products data.</p>
        <div className="d-flex align-items-center flex-wrap justify-content-center">
          <img src="/next-logo.png" className="img-fluid mx-2" style={{maxHeight:'8rem'}}/>
          <img src="/mongo.png" className="img-fluid mx-2" style={{maxHeight:'5rem'}}/>
        </div>
      </section>
    )
}

export default About