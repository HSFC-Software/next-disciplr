import Layout from "@/components/templates/page";
import Head from "next/head";
import Header from "@/components/base/header";
import { useRouter } from "next/router";
import { useGetConsolidationById } from "@/lib/queries";

export default function LessonScreen() {
  const router = useRouter();
  const { data: lesson } = useGetConsolidationById(
    router.query.lesson as string
  );
  return (
    <>
      <Head>
        <title>Disciplr | {lesson?.lesson_code.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="conso">
        <Header showBackArrrow>
          <div className="flex w-full justify-between items-center">
            <span>
              {lesson?.lesson_code.name}: {lesson?.lesson_code.title}
            </span>
          </div>
        </Header>
        <Outline lessonCode={lesson?.lesson_code.code ?? ""} />
      </Layout>
    </>
  );
}

function Outline(props: { lessonCode: string }) {
  if (props.lessonCode === "L1") {
    return <L1 />;
  }

  if (props.lessonCode === "L2") {
    return <L2 />;
  }

  return null;
}

function L1() {
  return (
    <div className="px-7 text-gray-500">
      <div>
        <strong>Flow</strong>
        <li>Magpakilala</li>
        <li>Kumusta ang experience mo sa gawain today?</li>
      </div>
      <div className="mt-2" />
      <div className="font-bold">STARTING UP YOUR NEW LIFE WITH JESUS</div>
      <div className="flex flex-col gap-3">
        <div>
          Question: Ano ang pagkakaintindi mo pag nakita mo itong title na ito?
        </div>
        <div>
          Question: Ano ang gusto mong simulan ni Kristo sa buhay mo? Ang
          mahalaga kilala mo kung sino ang tinanggap mo at nasaan na sya
        </div>
        <div>
          Question: Sa pagsisimula natin sino ba yung partner natin, pinaka
          kailangan natin? ALL HUMAN BEING NEEDS A SAVIOR BECAUSE LIFE DOES NOT
          WORK WITHOUT
        </div>
        <div>
          <strong>
            ALL HUMAN BEING NEEDS A SAVIOR BECAUSE LIFE DOES NOT WORK WITHOUT
            GOD.
          </strong>{" "}
          Kasama ka sa kailangan ng tagapagligtas. Walang kwenta ang buhay kapag
          wala kang Diyos.
        </div>
        <div>
          <strong>WE NEED TO GO BACK TO THE SAVIOR WHO TRULY LOVES US.</strong>{" "}
          Bumalik tayo sa tunay na nagmamahal sa atin - si Lord. Maaring mahalin
          tayo ng pamilya, kaibigan, ng ibang tao, pero hindi nila mahihigitan
          ang pagmamahal sa atin ng Diyos.
        </div>
        <div>
          Sa tao, sasabihin sayo &quot;Mahal kita kasi
          talented/maganda/gwapo/naibibigay mo gusto ko. Pero ‘pag nalaman nila
          ang past mo, hindi ka na Mahal.Pero pag ang Diyos nagmahal, ang
          sasabihin Niya sa’yo &quot;Mahal kita kahit nasasaktan mo ko&quot; /
          &quot;Mahal kita kahit pangit man ang nakaraan mo”. Ang pagmamahal ng
          Diyos ay sagad hanggang kaluluwa.{" "}
          <strong>
            His work on the cross brought redemption, renewal and restoration to
            our lives.
          </strong>{" "}
          Sa starting up your new life, hindi lang basta pumasok si Hesus sa
          puso mo kundi pumasok Siya nang may katotohanan.
        </div>
        <div className="font-bold mt-1">
          DISCOVERING THE TRUTH ABOUT YOUR NEW RELATIONSHIP WITH CHRIST
        </div>
        <div className="font-bold mt-1">4 BENEFITS OF SALVATION</div>
        <div>
          <strong>1. FORGIVENESS</strong> - Christ forgave your sin.
        </div>
        <div>Colosas 1:13-14</div>
        <i>
          13 Iniligtas niya tayo sa kapangyarihan ng kadiliman at inilipat sa
          kaharian ng kanyang minamahal na Anak. 14 Sa pamamagitan niya ay
          napalaya tayo, samakatuwid ay pinatawad ang ating mga kasalanan [sa
          pamamagitan ng kanyang dugo]. Hindi sa ayaw ng Diyos sa atin, kundi sa
          ating mga kasalanan. He destroyed the curses and works of darkness in
          our lives.
        </i>
        <div className="mt-1">
          <strong>2.PRIVILEGE OF SONSHIP</strong> - He made you a child of God.
        </div>
        <div>
          Kapag sa Ibang bahay nagpapaalam muna tayo bago makigamit ng facility
          pero pag nasa sariling tahanan di tayo nahihiya kasi nasa puder tayo
          ng magulang natin. Ganoon din sa Panginoon nasa puder ka nya
          pribeleheyo mo na humungi ng pangangailangan bilang anak.
        </div>
        <div>1 Juan 5:14</div>
        <i>
          14 May lakas-loob tayong lumapit sa kanya dahil alam nating ibibigay
          niya ang anumang hingin natin kung ito&apos;y naaayon sa kanyang
          kalooban.
        </i>
        <strong className="mt-1">
          Question: Ano ang hinihiling o ipinagdarasal mo kay Lord na magkaroon
          ka?
        </strong>
        <div>Ang Diyos ay hindi tayo iiwan ni pababayan</div>
        <strong>
          Question: Ano yung sitwasyon sa buhay mo na masasabi mong hindi ka
          iniwan ng Diyos?
        </strong>
        <li>Testimony nya</li>
        <li>Short testimony mo</li>
        <div className="mt-1">
          <strong>3.NEW LIFE</strong> - Christ began a new life.
        </div>
        <strong>2 Corinthians 5:17</strong>
        <i>
          17 Therefore, if anyone is in Christ, the new creation has come: The
          old has gone, the new is here!
        </i>
        <div>
          Halimbawa: kaya ka bumibili ng bagong damit para palitan ang luma.
          Kasi, maaring may damage na, hindi na fit o maganda tingnan sayo.
          Ganoon din sa lumang pagkatao natin na puno ng kasalanan hindi - na
          bagay sa atin. Kaya dapat ang isusuot natin ang bagong pagkatao (new
          identiy) na namumuhay sa kabanalan.
        </div>
        <strong>Ephesians 4:23</strong>
        <i>23 to be made new in the attitude of your minds;</i>
        <div>
          Magbago na kayo ng diwa at isip.{" "}
          <strong>
            Our lives is restored from its ORIGINAL GLORY and DESIGN.
          </strong>{" "}
          Ang original design sayo ng Diyos ay hindi lang basta mabuhay sa
          mundong ito kundi makapamuhay ng naayon sa kalooban Niya.
        </div>
        <strong>
          Question: Ano ang pamumuhay (ugali) na gusto mong mabago?
        </strong>
        <div className="mt-1">
          <strong>4.ETERNAL LIFE</strong> - God has given us eternal life and
          THIS LIFE IS IN HIS SON.
        </div>
        <strong>1 John 5:11-13</strong>
        <i>
          11 At ito ang patotoo: ipinagkaloob sa atin ng Diyos ang buhay na
          walang hanggan at ito&apos;y makakamtan natin sa pamamagitan ng
          kanyang Anak. 12 Kung ang Anak ng Diyos ay nasa isang tao, mayroon
          siyang buhay na walang hanggan; ngunit kung wala sa kanya ang Anak ng
          Diyos ay wala siyang buhay na walang hanggan.
        </i>
        <strong>John 14:6</strong>
        <i>
          6 Sumagot si Jesus, &quot;Ako ang daan, ang katotohanan, at ang buhay.
          Walang makakapunta sa Ama kundi sa pamamagitan ko
        </i>
        <div>
          Nabasa natin sa verse na paulit -ulit pinagdidiinan na{" "}
          <strong>
            may buhay na walang hanggan ang taong nananampalataya sa Anak ng
            Diyos (Kristo Hesus).
          </strong>
        </div>
        <div>
          Kaya di mo na kailangan magduda kung para sa langit ka. Maaring
          maraming palpak na disisyon ka dati at di mo na maibabalik yun. Pero
          alam mo ba ang pinaka tamang ginawa mo ay yung habang buhay ka pa
          tinanggap mo na si Hesus bilang Panginoon at tagapagligtas.
        </div>
        <div className="mt-1" />
        <strong>AFTER THE FLOW</strong>
        <li>Review the 4 benefits of salvation.</li>
        <li>
          Ano ang gusto mong pasimulan kasama si kristo? (Hikayating SIYA ang
          manalangin)
        </li>
        <li>
          Prayer request at ugali nyang nabangit na gustong mabago.
          (Consolidator ang manalangin)
        </li>
        <div className="mt-1" />
        <strong>CONSOLIDATOR{"'"}S REMINDER</strong>
        <ul>
          <ol>1.Ipakita ang pamagat ng booklet ‘pag nagtanong</ol>
          <ol>
            2. Ibagay ang intro sa kausap kung old christian or new christian.
          </ol>
          <ol>
            3. Point2 - Ipaliwanag ang kaibahan ng buhay niya ng nasa dilim pa
            at ngayong dapat mamuhay na sya sa liwanag.
          </ol>
          <ol>
            4. Pwedeng basahin sa tagalog ang verse sa mismong bible. Dapat may
            tanda na para di matagalan hanapin.
          </ol>
          <ol>
            5. Kung nahihiya manalangin para sa dapat niyang simulan, ipaalala
            na gamitin ang kanyang karapatan na makalapit sa Diyos. Hindi
            mahalaga ang haba o iksi kundi ang nilalaman ng puso. Kung nahihiya
            pa rin, ikaw na ang manalangin para sa kanya.
          </ol>
        </ul>
      </div>
    </div>
  );
}

function L2() {
  return <div>L2 out line here</div>;
}
