import style from './modal.module.scss'

type Props = {
    isVisible: boolean;
    onClose: any;
}

export default function ModalMember(props: Props) {   
    const {isVisible, onClose} = props

    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div className={style.modal_main} id="wrapper" onClick={handleClose}>
                <div className={style.modal_body}>
                    <button className={style.modal_buttonClose} onClick={() => onClose()}>X</button>
                    <div className={style.modal_content} >
                            Are you sure You want to remove member [member_name]?                       
                    </div>
                    <button className={style.modal_buttonConfirm}>
                        Confirm
                    </button>
                </div>
        </div>
    )
}
