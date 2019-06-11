import VideoList from './VideoList.js';
import exampleVideoData from "../data/exampleVideoData.js";
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import { options } from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      videoList: exampleVideoData,
      currentVideo: exampleVideoData[0],
      searchText: ''
    }
    this.onVideoTitleClick = this.onVideoTitleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log('dshflsdfjklds', this.props.searchYouTube(options('dogs', 5, YOUTUBE_API_KEY), (data) => console.log(data.items)) )
    this.props.searchYouTube(options(this.state.searchText, 5, YOUTUBE_API_KEY), (data) => {
      data = data.items ? data.items : data;
      console.log('component did mount')
      this.setState({
        videoList: data,
        currentVideo: data[0]
      });
    });
  }

  onVideoTitleClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  handleSearch(e) {
    // this.setState({
    //   searchText: e.target.value
    // })
    this.props.searchYouTube(options(e.target.value, 5, YOUTUBE_API_KEY), (data) => {
      console.log(data.items)
      data = data.items ? data.items : data;
      this.setState({
        videoList: data,
        currentVideo: data[0]
      });
    });

  }

  handleSubmit() {
    // console.log(this.state.searchText)

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchText={this.state.searchText} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList}  onVideoTitleClick={this.onVideoTitleClick}/>
          </div>
        </div>
      </div>
    )
  };
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
