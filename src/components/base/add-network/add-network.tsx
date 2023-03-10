import style from './addnetwork.module.scss'


export default function Addnetwork() {
    return (
        <div className={style.addNetwork_main}>
            <button className={style.addNetwork_img}>+</button>
            <div className={style.addNetwork_text}>
                    OPEN NEW NETWORK
            </div>
        
        </div>
    )
}
