import React, { Component } from 'react';
import './App.css';

class Card extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isHidden:true,
    }
  }
  changeState(){
    this.setState((prevState)=>({isHidden:!prevState.isHidden}));
  }
  
  render(){
    return(
      <div className = "card ">
        <a href={this.props.news.url} target = "_blank">
              <img src={this.props.news.urlToImage} alt="News" onError={(e)=>{e.target.src="news_alt.png"}}/>
              <h1> {this.props.news.title} </h1>
        </a>
        </div>
      );
    }
}

const NewsBoard = function (props){
  var arr =[];
  var i =0;
    props.news.articles.forEach(news => {
            arr.push(<Card news={news} key={i} />)
            i++;
        });
  return(
      <div className ="container">
        {arr}
      </div>
    )
}
const  SourceButton =function(props){

    return(
    <button  className="sourceButton" onClick = {() =>{
                        console.log("onclick:"+props.sourceId);
                        props.onclickHandler(props.sourceId);
                        }
                        }> 
      {props.sourceName} 
    </button>
    );
}
const SourceBar = function(props){
  var arr=[];
  for(var i = 0;i<props.sourceNames.length;i++)
  {
    var src = props.sourceNames[i];
    arr.push(<SourceButton key = {i} sourceName={src} sourceId={i} onclickHandler={props.onclickHandler}/>)
  }
  return(
    <div className="sourceBar">
      {arr}
    </div>
  )
}
const LoadingBar = function(props){
  return(
      <div className="loader"></div>
  )
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sources:["google-news-in","cnn","wired","abc-news"],
      sourceNames:["Google India","CNN","Wired","ABC News"],
      currentSource:0,
      news:{articles:[]},
      isLoading:true,
    }
    
  }
  componentDidMount(){
    this.changeSource(this.state.currentSource);
  }
  changeSource(i){
    this.setState({isLoading:true});
    var source = this.state.sources[i];
    if(i<this.state.sourceNames.length && i>=0)
    {
      console.log('changing source to '+this.state.sources[i]);
      fetch("https://newsapi.org/v2/top-headlines?sources="+source+"&apiKey=ed12c82e8848449ab32b67fd754bdccc")
      .then(
        (response)=>{
          return response.json();
        }
      ).then(
        (data)=>{
          console.log(data);
          this.setState({news:data,currentSource:i,isLoading:false});
        }
      )
    }
    else
    {
      console.log("Incorrect source number"+i);
    }
  }
  
  render() {
    var arr = [];
    if(this.state.isLoading)
    {
      arr.push(<SourceBar key={1} sourceNames={this.state.sourceNames} onclickHandler={this.changeSource.bind(this)} />)
      arr.push(<LoadingBar key={2}/>)
    }
    else
    {
      arr.push(<SourceBar key={1} sourceNames={this.state.sourceNames} onclickHandler={this.changeSource.bind(this)} />)
      arr.push(<NewsBoard key={2} news={this.state.news} />)
    } 
    return (
      <div className="App">
                {arr}
      </div>
    );
  }
}
export default App;
