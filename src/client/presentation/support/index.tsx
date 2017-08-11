import * as React from "react";

export type IBindStateToProps<IOwnProps, IStateProps> = (ownProps: IOwnProps) => IStateProps;
export type IBindActionToProps<IOwnProps, IStateProps, IActionProps> = (ownProps: IOwnProps, stateProps: IStateProps) => IActionProps;

export const BindComponentProps = <IOwnProps, IStateProps, IActionProps>(
    bindStateToProps?: IBindStateToProps<IOwnProps, IStateProps>,
    bindActionToProps?: IBindActionToProps<IOwnProps, IStateProps, IActionProps>,
) => {
    return (Component: React.ComponentClass<IOwnProps> | React.SFC<IOwnProps>): React.SFC<IOwnProps & IStateProps & IActionProps> => {
        return (ownProps: IOwnProps) => {
            const stateProps = bindStateToProps ? bindStateToProps(ownProps) : {} as IStateProps;
            const actionProps = bindActionToProps ? bindActionToProps(ownProps, stateProps) : {} as IActionProps;
            return <Component {...ownProps} {...stateProps} {...actionProps} />;
        };
    };
};

export const isMobile = (): boolean => navigator.userAgent
    .match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i) !== null;
