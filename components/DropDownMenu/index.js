import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DropDownMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listOpen: false,
      selected: { id: 0, flag: '' },
      styles: {},
      hover: false,
      hoverId: 0,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  onSelected(option) {
    this.setState({ selected: option });
    this.props.onChange(option);
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  handleMouseEnter(hoverId) {
    this.setState({ hover: true });
    this.setState({ hoverId: hoverId });
  }

  handleMouseLeave() {
    this.setState({ hoverId: 0 });
    this.setState({ hover: false });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
  }

  render() {
    const style = [{
      fontColor: {},
      imageWrapper: {},
    }];
    const list = this.props.list;
    const selected = this.state.selected.id === 0 ? this.props.selected : this.state.selected;
    const { listOpen } = this.state;
    const styles = this.props.styles || style;

    const value1 = this.props.value1 || 'name';
    const value2 = this.props.value2 || 'flag';
    let optionsValue = null;
    let selectedOption = null;

    optionsValue = list.map(opt => {
      return (
        <li key={opt.id} style={styles[0].dropDownLi}
          onMouseEnter={() => this.handleMouseEnter(opt.id)}
          onMouseLeave={() => this.handleMouseLeave()}
          onClick={() => this.onSelected(opt)}
          value={opt}>
          {(selected.id !== opt.id &&
            <div className="titleHead">
              {!this.state.hover || opt.id !== this.state.hoverId ?
                <div>
                  {value2 && <div className="imgLi">
                    <img  className="imgWidth" src={opt[value2]} />
                  </div>}

                  <div className="titleLi">{opt[value1]}</div>
                </div> : <div className="textAlignHover">

                  {value2 && <div className="imgLi">
                    <img className="imgWidth" src={opt[value2]} />
                  </div>}

                  <div className="titleLi">{opt[value1]}</div>
                </div>}</div>)}
        </li>)
    });
    selectedOption = <div className="dd-header" onClick={() => this.toggleList()}>
      {value2 && <div className="imageWrapper"> <img src={selected[value2]} className="imgWidth"/></div>}
      <div className="title">{selected[value1]}
        <img src="/assets/images/arrow-shadowed.png" alt="" className="arrow" />
      </div>
    </div>

    return (
      <div className="position">
        {selectedOption}
        {listOpen &&
          <ul className="dropDownList">
            <i className="fa fa-caret-up caret"></i>
            {optionsValue}
          </ul>
        }
      </div>
    );
  }
}

export default DropDownMenu;



// return (
//   <li key={opt.id} style={styles[0].dropDownLi}
//     onMouseEnter={() => this.handleMouseEnter(opt.id)}
//     onMouseLeave={() => this.handleMouseLeave()}
//     onClick={() => this.onSelected(opt)}
//     value={opt}>
//     {(selected.id !== opt.id &&
//       <div className="" style={styles[0].titleHead}>
//         {!this.state.hover || opt.id !== this.state.hoverId ?
//           <div>
//             {value2 && <div style={styles[0].imgLi}>
//               <img style={styles[0].imgWidth} src={opt[value2]} />
//             </div>}

//             <div className="" style={styles[0].titleLi}>{opt[value1]}</div>
//           </div> : <div style={styles[0].textAlignHover}>

//             {value2 && <div style={styles[0].imgLi}>
//               <img className="" style={styles[0].imgWidth} src={opt[value2]} />
//             </div>}

//             <div className="" style={styles[0].titleLi}>{opt[value1]}</div>
//           </div>}</div>)}
//   </li>)
// });
// selectedOption = <div className="dd-header" onClick={() => this.toggleList()}>
// {value2 && <div style={styles[0].imageWrapper}> <img src={selected[value2]} style={styles[0].imgWidth} /></div>}
// <div style={styles[0].title}>{selected[value1]}
//   <img src="/assets/images/arrow-shadowed.png" alt="" style={styles[0].arrow} />
// </div>
// </div>

// return (
// <div style={styles[0].position}>
//   {selectedOption}
//   {listOpen &&
//     <ul style={styles[0].dropDownList}>
//       <i className="fa fa-caret-up" style={styles[0].caret}></i>
//       {optionsValue}
//     </ul>
//   }
// </div>
// );
