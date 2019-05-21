/* global expect, it, describe  */
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { TextInput, DropDown } from '../formUtils';

Enzyme.configure({ adapter: new Adapter() });

const funcChange = jest.fn();
const funcBlur = jest.fn();
const error = 'I am error';



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


  // Integrations!


  describe('Should pass our beautiful integration tests', () => {


    it('Should create a new form', () => {
      const container = mount(<App />);
      container.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'John' } });
      container.find('input[name="lastname"]').simulate('change', { target: { name: 'lastname', value: 'Johnson' } });
      container.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'test@gmail.com' } });
      container.find('select[name="age"]').simulate('change', { target: { name: 'age', value: 21 } });
      container.find('input[type="submit"]').simulate('submit');

      expect(container.find('li').length).toBe(5);
      expect(container.find('span.user').at(4).text()).toBe('Johnson, John: 21 (test@gmail.com)');
    });


    it('Should clear new form when clicking Clear Fields button', () => {
      const container = mount(<App />);
      container.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'John' } });
      container.find('input[name="lastname"]').simulate('change', { target: { name: 'lastname', value: 'Johnson' } });
      container.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'test@gmail.com' } });
      container.find('select[name="age"]').simulate('change', { target: { name: 'age', value: 21 } });

      container.find('button.clear').simulate('click');

      expect(container.find('input[name="name"]').props().value).toBe('');
      expect(container.find('input[name="lastname"]').props().value).toBe('');
      expect(container.find('input[name="email"]').props().value).toBe('');
    });


    it('Should throw a validation error if email is wrong', () => {
      const container = mount(<App />);
      container.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'John' } });
      container.find('input[name="name"]').simulate('blur');

      container.find('input[name="lastname"]').simulate('change', { target: { name: 'lastname', value: 'Johnson' } });
      container.find('input[name="lastname"]').simulate('blur');

      container.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'blabla' } });
      container.find('input[name="email"]').simulate('blur');

      container.find('select[name="age"]').simulate('change', { target: { name: 'age', value: 21 } });
      container.find('select[name="age"]').simulate('blur');

      container.find('input[type="submit"]').simulate('submit');

      expect(container.find('.errorMsg').text()).toBe('This field must be an e-mail address');
    });


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






