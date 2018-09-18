/**
 * @class ReactPdfJs
 */
import PdfJsLib from 'pdfjs-dist';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ReactJsPdf extends Component {


  renderOnePage() {
    PdfJsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';
    PdfJsLib.getDocument(this.props.file).then((pdf) => {
      this.setState({ pdf });
      if (this.props.onDocumentComplete) {
        this.props.onDocumentComplete(pdf.pdfInfo.numPages);
      }
      pdf.getPage(this.props.page).then((page) => {
        const scale = this.props.scale === undefined ? 1.5 : this.props.scale;
        const viewport = page.getViewport(scale);

        const { canvas } = this;
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext,
          viewport,
        };
        page.render(renderContext);
      });
    });
  }

  renderFullDoc() {
    PdfJsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';
    PdfJsLib.getDocument(this.props.file).then((pdf) => {
      this.setState({ pdf });
      const pages = pdf.pdfInfo.numPages

      for (let index = 1; index < pages; index++) {
        pdf.getPage(index).then((page) => {
          const scale = this.props.scale === undefined ? 1.5 : this.props.scale;
          const viewport = page.getViewport(scale);

          const {container} = this;
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          container.appendChild(canvas)

          const renderContext = {
            canvasContext,
            viewport,
          };
          page.render(renderContext);
        });
      }
    });

  }

  renderOtherPage(newProps){
    this.state.pdf.getPage(newProps.page).then((page) => {
      const scale = 1.5;
      const viewport = page.getViewport(scale);

      const { canvas } = this;
      const canvasContext = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext,
        viewport,
      };
      page.render(renderContext);
    });
  }

  componentDidMount() {
    if (this.props.full === undefined || this.props.full === false){
      this.renderOnePage()
    }else{
      this.renderFullDoc();
    }
  }



  componentWillReceiveProps(newProps) {
    if (newProps.page !== this.props.page) {
      this.renderOtherPage(newProps)
    }
  }

  render() {
    if (this.props.full === undefined || this.props.full === false)
      return <canvas ref={(canvas) => { this.canvas = canvas; }} />;
    else
      return <div ref={(container) => {this.container = container}} />
  }
}

ReactJsPdf.propTypes = {
    file: PropTypes.string.isRequired,
    page: PropTypes.number,
    onDocumentComplete: PropTypes.func,
    scale: PropTypes.number,
    full: PropTypes.bool

}
