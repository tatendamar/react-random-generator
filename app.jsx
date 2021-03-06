// Button Component
class Button extends React.Component {
  constructor(props) {
    super(props);

    //Initial state
    this.state = {
      name: "",
      quote: ""
    };
  }
  //After rendering (DOM available)
  componentDidMount = () => {
    //provide the DOM with these events
    this.handleClick();
    this.handleTweetClick();
  };

  //when a user clicks the new quote button this method is triggered
  handleClick = () => {
    //use fetch Api method to reach to a server
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json()) //stringify the response
      .then(data =>
        data.quotes.map(res => ({
          name: `${res.author}`,
          quote: `${res.quote}`
        }))
      )
      //if we get data we pass it to the next then inorder to perform a random genetor method
      .then(function(getData) {
        const randomData = Math.floor(Math.random() * getData.length);
        console.log(getData[randomData]);
        return getData[randomData];
      })
      .then(parsedData => {
        const { name, quote } = parsedData;
        this.setState({
          name,
          quote
        });
      })
      .catch(error => console.log("Error occured failed at:", error));
  };
  //tweet button method
  handleTweetClick = () => {
    //open in a different window
    window.open(
      `https://twitter.com/intent/tweet?text="${this.state.quote}"- ${
        this.state.name
      }`
    );
  };

  render() {
    return (
      <div>
        <Qoute quote={this.state.quote} name={this.state.name} />
        <div className="btn">
          <a href="#" className="btn-qoute" onClick={this.handleClick}>
            new qoute
          </a>
          <a href="#" className="btn-twitter" onClick={this.handleTweetClick}>
            <i className="fa fa-twitter" />
          </a>
        </div>
        <h5>Designed & coded by TATENDA MARUFU</h5>
      </div>
    );
  }
}

//stateless Quoote Component
class Qoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="text">
          <span className="symbol">&#8220;</span>
          {this.props.quote}
          <br />
          <span className="name">-{this.props.name}</span>
        </p>
      </div>
    );
  }
}

//rendered App Component
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main">
        <Button />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
