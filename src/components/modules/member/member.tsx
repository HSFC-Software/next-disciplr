import style from "./member.module.scss"
import MemberBadge from "../../base/member-badge/badge"

export default function Member() {
    return (
        <div className={style.member_main}>
            <div className={style.member_nav}>
                <div className={style.member_count}>
                    MEMBERS(9)
                </div>
                <div className={style.member_addnew}>
                    ADD NEW
                    <button className={style.member_button}>+</button>
                </div>
            </div>
            <div className={style.member_list}>
                <MemberBadge 
                    first_name="John"
                    last_name="Doe"
                />
                <MemberBadge 
                    first_name="arthur"
                    last_name="dela cruz"
                />
                <MemberBadge 
                    first_name="John michale"
                    last_name="dela tore"
                />
                <MemberBadge 
                    first_name="mark bryan"
                    last_name="dela cruz"
                />
                <MemberBadge 
                    first_name="antony"
                    last_name="alvarado"
                />
                <MemberBadge 
                    first_name="james"
                    last_name="harden"
                />
                <MemberBadge 
                    first_name="kobe"
                    last_name="bryan"
                />
            </div>
            <div className={style.member_show}>
                Show Inactive Network
            </div>
        </div>
    )
}
