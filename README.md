# reactjs-pdf

`reactjs-pdf` provides a component for rendering PDF documents using [PDF.js](http://mozilla.github.io/pdf.js/). Written for React 15/16 and ES2015 using the Airbnb style guide.

---
[![NPM Version](https://img.shields.io/npm/v/reactjs-pdf.svg?style=flat-square)](https://www.npmjs.com/package/reactjs-pdf)
[![NPM Downloads](https://img.shields.io/npm/dm/reactjs-pdf.svg?style=flat-square)](https://www.npmjs.com/package/reactjs-pdf)
[![Build Status](https://img.shields.io/travis/mikecousins/reactjs-pdf/master.svg?style=flat-square)](https://travis-ci.org/mikecousins/reactjs-pdf)
[![Dependency Status](https://david-dm.org/mikecousins/reactjs-pdf.svg)](https://david-dm.org/mikecousins/reactjs-pdf)
[![devDependency Status](https://david-dm.org/mikecousins/reactjs-pdf/dev-status.svg)](https://david-dm.org/mikecousins/reactjs-pdf#info=devDependencies)

## Usage

Install with `yarn add reactjs-pdf` or `npm install reactjs-pdf`

Use it in your app (showing some basic pagination as well):

```js
import React from 'react';
import PDF from 'reactjs-pdf';

class MyPdfViewer extends React.Component {
  state = {};

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <PDF
          file="test.pdf"
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    )
  }
}

export default MyPdfViewer;
```

## License

MIT © [Psyycker](https://github.com/psyycker)
