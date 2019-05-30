/* global expect, it, describe  */
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { act, renderHook } from 'react-hooks-testing-library';
import { cleanup } from 'react-testing-library';
import App from '../App';


import { TextInput, DropDown, useValidation } from '../formUtils';

Enzyme.configure({ adapter: new Adapter() });

const funcChange = jest.fn();
const funcBlur = jest.fn();
const funcCallback = jest.fn();
const error = 'I am error';

const initialUser = {
  name: 'Peter',
  lastname: 'Smith',
  id: 1,
  email: 'peter@zartis.com',
  age: 21
};
const validation = {
  name: 'required',
  email: 'email',
  lastname: 'required',
};

describe('Should pass tests', () => {

  // hello word to my tests!
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  // Some unit testing!
  describe('Should pass all our unit tests', () => {

    describe('TextInput',() => {
      it('Should trigger onChange, onBlur when passed as props', ()  => {

        const container = shallow(<TextInput
          handleChange={funcChange}
          handleBlur={funcBlur}
        />);

        container.find('input').simulate('change', { target: { name: 'name', value: 'John' } });
        expect(funcChange).toHaveBeenCalled();

        container.find('input').simulate('blur');
        expect(funcBlur).toHaveBeenCalled();

      });


      it('Should display an error when passed as prop', ()  => {
        const container = shallow(<TextInput
          error={error}
        />);

        expect(container.find('p.errorMsg').text()).toBe(error);
      });
    });

    describe('DropDown', () => {

      it('Should render even without values', ()  => {
        const container = shallow(<DropDown/>);
        expect(container.find('select').length).toBe(1);

      });

      it('Should trigger onChange, onBlur when passed as props', ()  => {
        const container = shallow(<DropDown
          handleChange={funcChange}
          values={[10,20,30]}
        />);
        container.find('select').simulate('change', { target: { name: 'age', value: 20 } });
        expect(funcChange).toHaveBeenCalled();

      });

      it('Should display an error when passed as prop', ()  => {
        const container = shallow(<DropDown
          error={error}
        />);
        expect(container.find('p.errorMsg').text()).toBe(error);
      });

    });

  });


  describe('Tests in hooks!', () => {

    let handleChange;
    let handleSubmit;
    let clearFields;
    let handleBlur;

    let result;
    let rerender;
    let current;

    beforeEach(() => {
      cleanup();
      jest.clearAllMocks();
      ({ result, rerender } = renderHook(() => useValidation(validation, initialUser, funcCallback)));
      ({ current } = result);
      ({handleChange, handleSubmit, clearFields, handleBlur} = current);
    });

    it('Data should have the initial state', () => {
      expect(result.current.data).toEqual(initialUser);
    });

    it('Should use setData to change name to Javier (from handleChange)', () => {
      const changedName = 'Javier';
      act(() => {
        handleChange({target: {name: 'name',value:changedName}});
      });
      expect(result.current.data).toEqual({
        ...initialUser,
        name: changedName
      });
    });

    it('Should return to initial data when clearFields is called', () => {
      const changedName = 'Javier';
      act(() => {
        handleChange({target: {name: 'name',value:changedName}});
        clearFields();
      });
      expect(result.current.data).toEqual({
        ...initialUser
      });
    });


    it('Should throw an error if a wrong email is added or the name field is empty', () => {
      act(() => {
        handleChange({target: {name: 'name',value:''}});
        handleBlur({target: {name: 'name'}});
      });
      rerender(); // needed for getting updated the "canSubmit" value that is triggered by useEffect
      expect(result.current.errors).toEqual({'name': 'This field is required'});
      expect(result.current.canSubmit).toBe(false);

      act(() => {
        handleChange({target: {name: 'email',value:'yessmail'}});
        handleBlur({target: {name: 'email'}});
      });
      rerender(); // needed for getting updated the "canSubmit" value that is triggered by useEffect
      expect(result.current.errors).toEqual({'email': 'This field must be an e-mail address'});
      expect(result.current.canSubmit).toBe(false);
    });


    it('Should do a callback when submitting', () => {
      handleSubmit({
        preventDefault: jest.fn(),
      });
      expect(result.current.canSubmit).toBe(true);
      expect(funcCallback).toHaveBeenCalled();
    });
  });


  // Integrations!

  describe('Should pass our beautiful integration tests', () => {

    it('Should edit a form', () => {
      const container = mount(<App />);
      container.find('button.edit').at(0).simulate('click');
      container.find('input[name="name"]').at(0).simulate('change', { target: { name: 'name',  value: 'Mark' } });
      container.find('input[name="lastname"]').at(0).simulate('change', { target: { name: 'lastname', value: 'Thompson' } });
      container.find('input[name="email"]').at(0).simulate('change', { target: { name: 'email', value: 'blabla@gmail.com' } });
      container.find('select[name="age"]').at(0).simulate('change', { target: { name: 'age', value: 22 } });
      container.find('input[type="submit"]').at(0).simulate('submit');

      expect(container.find('span.user').at(0).text()).toBe('Thompson, Mark: 22 (blabla@gmail.com)');
    });

  });

});






