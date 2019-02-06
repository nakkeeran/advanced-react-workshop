import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

function withMedia (Component, queries) {
  const media = createMediaListener(queries)

  return class extends React.Component {
    state = {
      media: media.getState()
    };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render () {
      return <Component {...this.props} media={this.state.media} /> // this.props inherit props from parent
    }
  }
}

class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <div>
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </div>
    );
  }
}

export default withMedia(App, {
      big: "(min-width : 1000px)",
      tiny: "(max-width: 600px)"
  });
