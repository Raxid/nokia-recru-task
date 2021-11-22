import React from 'react';
import CountriesList from './components/CountriesList';
import {AgGridReact} from 'ag-grid-react';
import {mount} from 'enzyme';
import {act} from "@testing-library/react";

let component = null;
let agGridReact = null;
let searchBar = null;
 
const ensureGridApiHasBeenSet = async (componentRef) => {
  await act(async () => {
    await new Promise(function (resolve, reject) {
        (function waitForGridReady() {
            if (componentRef.current.getApi()) {
                if (componentRef.current.getApi().getRowNode(8)) {
                    return resolve();
                }
            }
            setTimeout(waitForGridReady, 1000);
        })();
    })

});
};
 
beforeEach(async () => {
    const ref = React.createRef()
    component = mount(<CountriesList ref={ref}/>);
    agGridReact = component.find(AgGridReact).instance();
    await ensureGridApiHasBeenSet(ref);
    });
    afterEach(() => {
      component.unmount();
      agGridReact = null;
    })
    
describe('Testing search bar:', () => {
  
    it('Poland is searching...', done => {
      searchBar = component.find('#searchBar');
      searchBar.props().value="Poland";
      searchBar.simulate('change');
      expect(searchBar.prop('value')).toEqual("Poland");
      done();
    });

    it('Russia is searching...', done => {
      searchBar = component.find('#searchBar');
      searchBar.props().value="Russia";
      searchBar.simulate('change');
      expect(searchBar.prop('value')).toEqual("Russia");
      done();
    });
});


