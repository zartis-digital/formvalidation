import Enzyme, { mount, render, shallow } from "enzyme"; // eslint-disable-line
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App';
import Form from '../form'; // eslint-disable-line



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



it('we change first render', () => {
  const container = shallow(<Form />);
  expect(container).toMatchSnapshot();




  const paymentMethodButton = wrapper.find('#payment_method');
  paymentMethodButton.simulate('click');
  expect(props.toggleModal).toHaveBeenCalled();
  expect(wrapper).toMatchSnapshot();



});



it('Should create a new form', () => {


  const container = mount(<App />);


  container.find('input[name="name"]').simulate('change', { target: {  value: 'John' } });
  container.find('input[name="lastname"]').simulate('change', { target: {  value: 'Johnson' } });
  container.find('input[name="email"]').simulate('change', { target: {  value: 'test@gmail.com' } });
  container.find('select[name="age"]').simulate('change', { target: {  value: 21 } });
  container.find('input[type="submit"]').simulate('click');


  expect(container).toMatchSnapshot();

  // expect(props.toggleModal).toHaveBeenCalled();


  // expect(container).toMatchSnapshot();



});

