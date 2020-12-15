import React from 'react';
import { CustomButton } from '../custom-button';
import classNames from 'classnames';
import './styles.scss';
export const MessagePopUp = ({
    messageTitle = 'Message Title',
    messageDescription = 'This is descriptive message.',
    leftButtonLabel = '',
    rightButtonLabel = '',
    leftButtonAction = () => { },
    rightButtonAction = () => { },
    children,
    pre = false,
    ...props
}) => {

    return (
        <div className='message-modal-wrap' onClick={rightButtonAction}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className={classNames([
                    { 'message-wrap': !pre },
                    { 'message-pre-wrap': pre },
                ])}

                >
                    <h2>
                        {messageTitle}
                    </h2>
                    <span className='message-description-container'>
                        <p>{messageDescription}</p>
                    </span>
                    {children}
                    <div className='btn-container'>
                        {!!leftButtonLabel && <CustomButton
                            buttonStyle='btn btn-sm btn-cancel'
                            buttonAction={leftButtonAction}
                        >
                            {leftButtonLabel}
                        </CustomButton>}
                        <CustomButton
                            buttonAction={rightButtonAction}
                            buttonStyle='btn btn-sm btn-primary'
                        >
                            {rightButtonLabel}
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div >
    );
}


