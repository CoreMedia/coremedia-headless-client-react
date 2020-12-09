// @flow
import React from 'react';

import ReactModalAdapter from '../ReactModalAdapter';

describe('ReactModalAdapter Component', () => {
  it('should render Modal Component properly', () => {
    const props = {
      className: 'Class Name',
      overlayClassName: {
        base: 'Overlay Base',
        afterOpen: 'Overlay After Open',
        beforeClose: 'Overlay Before Close',
      },
      modalClassName: {
        base: 'Modal Base',
        afterOpen: 'Modal After Open',
        beforeClose: 'Modal Before Close',
      },
      someProp: 'value',
    };

    const wrapper = shallow(<ReactModalAdapter {...props} />);
    const modal = wrapper.find('Modal');
    expect(modal.prop('overlayClassName')).toEqual(props.overlayClassName);
    expect(modal.prop('className')).toEqual(props.modalClassName);
    expect(modal.prop('portalClassName')).toEqual(props.className);
    expect(modal.prop('someProp')).toEqual(props.someProp);
    expect(modal.prop('ariaHideApp')).toBe(false);
  });
});
