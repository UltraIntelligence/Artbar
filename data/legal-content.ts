export type LegalTextBlock = {
  heading?: string;
  body?: string[];
  list?: string[];
  fields?: { label: string; value: string }[];
};

export type LegalLanguageSection = {
  language: string;
  eyebrow: string;
  title: string;
  intro?: string;
  blocks: LegalTextBlock[];
};

export type LegalPageContent = {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  sections: LegalLanguageSection[];
};

export const legalPages = {
  privacyPolicy: {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Artbar Tokyo privacy policy for customers, visitors, bookings, and event participation.',
    updated: '2026/04/01',
    sections: [
      {
        language: 'English',
        eyebrow: 'Privacy Policy',
        title: 'Privacy Policy',
        intro: 'Effective Date: 2026/04/01',
        blocks: [
          {
            heading: '1. Introduction',
            body: [
              'Artbar ("we," "us," or "our") is committed to protecting the privacy of our customers and visitors ("you" or "your"). This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website or participate in our paint and sip events in Tokyo, Japan.',
            ],
          },
          {
            heading: '2. Information We Collect',
            body: ['We may collect the following types of personal information:'],
            list: [
              'Contact Information: Name, email address, and postal address.',
              'Event Participation: Information related to your participation in our events, such as booking details and preferences.',
            ],
          },
          {
            heading: '3. How We Use Your Information',
            body: ['We use your personal information for the following purposes:'],
            list: [
              'To process and manage your bookings and payments.',
              'To communicate with you regarding your reservations and our services.',
              'To improve our services and enhance your experience.',
              'To send you promotional materials and updates, if you have opted to receive them.',
              'To comply with legal obligations and protect our legal rights.',
            ],
          },
          {
            heading: '4. Disclosure of Your Information',
            body: ['We may share your personal information with:'],
            list: [
              'Service Providers: Third parties who assist us in providing our services, such as payment processors and email marketing platforms.',
              'Legal Authorities: When required by law or to protect our rights and interests.',
              'Business Transfers: In the event of a merger, acquisition, or sale of our business.',
            ],
          },
          {
            heading: '5. Data Security',
            body: [
              'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.',
            ],
          },
          {
            heading: '6. Data Retention',
            body: [
              'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
            ],
          },
          {
            heading: '7. Your Rights',
            body: ['You have the right to:'],
            list: [
              'Access your personal information.',
              'Correct or update your personal information.',
              'Request the deletion of your personal information.',
              'Object to or restrict the processing of your personal information.',
              'Withdraw your consent at any time, where consent is the basis for processing.',
              'To exercise these rights, please contact us using the information provided below.',
            ],
          },
          {
            heading: '8. Changes to This Privacy Policy',
            body: [
              'We may update this Privacy Policy from time to time. Any changes will be posted on our website with the updated effective date.',
            ],
          },
          {
            heading: '9. Contact Us',
            body: [
              'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
              'Artbar, 7-2 Daikanyama-cho, Shibuya-ku, Tokyo 〒150-0034, Tokyo, Japan',
              'Email: tokyo@artbar.co.jp',
              'By using our services, you agree to the terms of this Privacy Policy. Thank you for choosing Artbar.',
            ],
          },
        ],
      },
      {
        language: '日本語',
        eyebrow: 'プライバシーポリシー',
        title: 'プライバシーポリシー',
        intro: '発効日：2026/04/01',
        blocks: [
          {
            heading: '1. はじめに',
            body: [
              'Artbar Tokyo（以下、「当社」といいます）は顧客および訪問者（以下、「お客様」といいます）のプライバシーの保護に努めています。本プライバシーポリシーは、お客様が当社のウェブサイトを訪問された場合、または東京で開催されるイベントに参加された場合に、当社がどのようにお客様の個人情報を収集、使用、開示、保護するかについて概説するものです。',
            ],
          },
          {
            heading: '2. 当社が収集する情報',
            body: ['当社は、以下の種類の個人情報を収集することがあります：'],
            list: [
              '連絡先情報：氏名、Eメールアドレス、電話番号、住所',
              'お支払い情報：クレジットカード情報',
              'イベント参加予約の詳細など、当社のイベントへの参加に関する情報',
              'オンライン活動IPアドレス、ブラウザの種類、訪問したページなど、当社ウェブサイトとのやり取りに関する情報',
            ],
          },
          {
            heading: '3. 個人情報の利用目的',
            body: ['当社は、お客様の個人情報を以下の目的で利用します：'],
            list: [
              'お客様のご予約とお支払いを処理・管理するため',
              'お客様のご予約や当社のサービスに関して、お客様と連絡を取るため',
              '当社のサービスを改善し、お客様の体験を向上させるため',
              'プロモーション資料や最新情報をお送りするため',
              '法的義務を遵守し、当社の法的権利を保護するため',
            ],
          },
          {
            heading: '4. お客様の情報の開示',
            body: ['当社は、お客様の個人情報を以下の者と共有することがあります：'],
            list: [
              'サービスプロバイダー：支払い処理業者やEメールマーケティングプラットフォームなど、当社のサービス提供を支援する第三者',
              '法的機関：法律によって要求された場合、または当社の権利と利益を保護する場合',
              '事業譲渡：当社の事業が合併、買収、売却された場合',
            ],
          },
          {
            heading: '5. データセキュリティ',
            body: [
              '当社は、お客様の個人情報を不正アクセス、開示、改ざん、破壊から保護するために、適切な技術的および組織的対策を実施します。',
            ],
          },
          {
            heading: '6. データの保持',
            body: [
              '当社は、本プライバシーポリシーに記載されている目的を達成するために必要な期間、お客様の個人情報を保持します。ただし、法律により長い保持期間が要求または許可されている場合はこの限りではありません。',
            ],
          },
          {
            heading: '7. お客様の権利',
            body: ['お客様には以下の権利があります：'],
            list: [
              'お客様の個人情報にアクセスする権利',
              'お客様の個人情報の修正または更新',
              'お客様の個人情報の削除',
              'お客様の個人情報の処理に異議を唱える、または処理を制限する',
              '同意が処理の根拠となっている場合、いつでも同意を撤回する',
              'これらの権利を行使するには、以下に記載されている情報を使用して当社までご連絡ください。',
            ],
          },
          {
            heading: '8. 本プライバシーポリシーの変更',
            body: [
              '当社は、本プライバシーポリシーを随時更新することがあります。変更があった場合は、更新された発効日と共に当社のウェブサイトに掲載されます。',
            ],
          },
          {
            heading: '9. お問い合わせ',
            body: [
              '本プライバシーポリシーまたは当社のデータ慣行についてご質問やご懸念がある場合は、下記までご連絡ください：',
              'Artbar Tokyo, 7-2 Daikanyama-cho, Shibuya-ku, Tokyo 〒150-0034, 東京, 日本',
              '電子メール：tokyo@artbar.co.jp',
              '当社のサービスを利用することにより、このプライバシーポリシーの条項に同意したものとみなされます。Artbar Tokyoをご利用いただきありがとうございます。',
            ],
          },
        ],
      },
    ],
  },
  termsOfService: {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Artbar Tokyo terms and conditions for adult sessions and kids events.',
    sections: [
      {
        language: 'English',
        eyebrow: 'Terms of Service',
        title: 'Terms of Service',
        intro: 'Please read our Terms & Conditions fully before purchasing your ticket. By attending the sessions, you agree to Artbar’s Terms & Conditions.',
        blocks: [
          {
            heading: 'Age Requirements',
            body: ['We have a free-flow of alcohol so all attendees must be age 20 years or older.'],
          },
          {
            heading: 'Locations',
            body: ['We have several locations so please check the studio name on the ticket.'],
          },
          {
            heading: 'Clothing',
            body: [
              'We will be using acrylic paint in the studios, which does not come out of clothing. Accidents may happen so please anticipate that you may get paint on your clothing. Our staff and other guests are not responsible for cleaning fees or replacing clothing stained from paint. Please wear clothing you don’t mind getting a bit of paint on.',
            ],
          },
          {
            heading: 'Refund & Cancellation',
            body: [
              'Cancellations made 72 hours or more before the start of the session are eligible for a 100% refund. Cancellations made within 24 to 72 hours before the start of the session are eligible for a 75% refund. Cancellations made within 24 hours before the start of the session are not eligible for a refund.',
              'Purchases made with gift codes or gift certificates are non-refundable. If a ticket is paid partly with a gift code or gift certificate and the booking is canceled during a refundable window, only the credit card or cash portion will be refunded.',
              'Please use our self-cancellation system on our website contact page by selecting “cancel or change my ticket” on the drop down menu. If the drop down menu does not show, please try from another browser or device.',
              'Please note these exceptions to the refund policy: Some classes are non-refundable as they require special orders or printing. Those classes include Alcohol Art Portrait classes, and any others that state they are Non-refundable in the event description.',
            ],
          },
          {
            heading: 'Alcohol Ink sessions',
            body: [
              'Alcohol ink uses materials that can be harmful. If you are pregnant, have respiratory illness, or sensitive to alcohol please do not sign up for this class.',
            ],
          },
          {
            heading: 'Contact',
            body: [
              'If you have questions or concerns, please check our FAQ page and if you need to contact us, the fastest way to reach us is through the contact form from the website. We are unable to answer the phone in any studio location.',
            ],
          },
          {
            heading: 'Copyright',
            body: [
              'By attending an Artbar Tokyo session, you agree that you will not replicate, reproduce, or redistribute Artbar’s session process, contents, or provided materials for commercial use. All Artbar Tokyo artwork, photos, images, text descriptions, and session processes are copyrighted.',
            ],
          },
          {
            heading: 'Liability',
            body: [
              'While at Artbar Tokyo, it is your responsibility to comply with all safety precautions during the session. Artbar Tokyo, staff, and other attendees of the session hold no liability or responsibility for any damage, loss, or theft of personal belongings or any physical injuries that may occur during a session.',
              'We are not responsible for injury or illness due to overconsumption or other effects from alcohol or snacks.',
            ],
          },
          {
            heading: 'Kids Event Important Ticket Information',
            body: [
              'This event is designed for families and children. Thank you for joining an Artbar Tokyo session. We are looking forward to getting creative with you!',
              'Kids attending must be at least 5 years old and able to go to the bathroom unassisted.',
              'Parents and guardians cannot stay inside the studio during the session.',
              'If you arrive more than 30 minutes late, your child may not be able to complete the artwork.',
              'Cancellations made 72 hours or more before the start of the session are eligible for a 100% refund. Cancellations made within 24 to 72 hours before the start of the session are eligible for a 75% refund. Cancellations made within 24 hours before the start of the session are not eligible for a refund.',
              'Purchases made with gift codes or gift certificates are non-refundable. If a ticket is paid partly with a gift code or gift certificate and the booking is canceled during a refundable window, only the credit card or cash portion will be refunded.',
            ],
          },
        ],
      },
      {
        language: '日本語',
        eyebrow: '利用規約',
        title: '利用規約',
        intro: 'チケットを購入する前に利用規約を十分にお読みください。チケット購入完了の時点で利用規約に同意したものとみなされます。',
        blocks: [
          {
            heading: '会場',
            body: ['Artbar Tokyoはいくつかの店舗がございますので、ご予約の会場を必ずお確かめ下さい。'],
          },
          {
            heading: '年齢制限',
            body: ['大人向けセッションは20歳以上のお客様を対象としております。'],
          },
          {
            heading: '遅刻について',
            body: ['開始時間に遅れる場合、特にご連絡は必要ございませんが30分以上遅れて参加されますと作品が完成しない可能性がございます。'],
          },
          {
            heading: '免責事項',
            body: [
              'セッションではアクリル絵の具を使用します。お洋服に付着しますとお洗濯では洗い落とす事が難しいのでご注意ください。万が一お客様のお洋服などが絵の具で汚れてしまっても当社は一切の責任を負いません。また、セッション中に発生したお客様の所有物の損害・損失・盗難または身体的な怪我や疾患に対してArtbar Tokyoは一切の責任を負いません。',
            ],
          },
          {
            heading: 'キャンセル',
            body: [
              'ご予約セッション開始時間の72時間前までのキャンセルは、100%返金の対象となります。開始時間の24時間前から72時間前までのキャンセルは、75%返金の対象となります。開始時間の24時間前を過ぎてからのキャンセルは、返金の対象外となります。',
              'ギフト券や割引ギフトコードを使用したご予約は返金できません。チケット代金の一部をギフト券やギフトコードで支払い、返金対象期間内にキャンセルされた場合は実際にお支払いになった金額のみが返金されます。',
              'お問合せフォームの「キャンセル・変更」からお手続き下さい。',
            ],
          },
          {
            heading: 'アルコールインクアート',
            body: [
              'アルコールインクアートをご予約のお客様のみお読み下さい。使用するアルコールはお客様の健康に悪影響を及ぼす可能性がございます。妊娠中の方や呼吸器に疾患のある方はご予約をお控え下さい。',
            ],
          },
          {
            heading: 'お問合せ',
            body: [
              'ご不明な点がございましたら、よくある質問のページをご確認ください。解決しない場合はお問い合わせフォームをご利用ください。お電話でのお問合せは現在お受けしておりません。',
            ],
          },
          {
            heading: '著作権',
            body: [
              'セッションのサンプル(お手本の作品)や講師による指導内容の著作権は全てArtbar Tokyoに帰属します。セッション中に撮影した写真や動画を商業目的で利用・複製・複写・再配布する事を禁止します。',
            ],
          },
          {
            heading: 'キッズイベント利用規約',
            body: [
              'Artbar Tokyo - Kids Event Important Ticket Information - This event is designed for families and children.',
              'このセッションは5歳以上のお子様を対象としています。',
              '保護者の方はセッション中にスタジオ内に滞在する事ができません。予めご了承くださいませ。',
              '開始時間に遅れる場合、特にご連絡は必要ございませんが30分以上遅れて参加されますと作品が完成しない可能性がございます。',
              'アクリル絵の具を使用します。お洋服に付着しますとお洗濯では洗い落とす事が難しいのでご注意ください。絵の具汚れに関して当社は一切の責任を負いかねます。',
              'ご予約セッション開始時間の72時間前までのキャンセルは、100%返金の対象となります。開始時間の24時間前から72時間前までのキャンセルは、75%返金の対象となります。開始時間の24時間前を過ぎてからのキャンセルは、返金の対象外となります。お問合せフォームのキャンセル・変更の項目からお手続き下さい。',
              'ギフト券や割引ギフトコードを使用したご予約は返金できません。チケット代金の一部をギフト券やギフトコードで支払い、返金対象期間内にキャンセルされた場合は実際にお支払いになった金額のみが返金されます。',
              '著作権について：Artbar Tokyoのセッションに参加される方は、セッションのプロセス、アートワーク、写真、画像、テキスト説明、内容、提供された資料を商業目的で複製、複写、再配布しないことに同意したものとします。',
              'Artbar Tokyoでのセッション中、安全に関するすべての注意事項を遵守して下さい。Artbar Tokyoのスタッフやセッションの他の参加者は、セッション中に発生しうる個人の所有物の損害、損失、盗難、または身体的な怪我に対して一切の責任、義務を負いません。',
            ],
          },
        ],
      },
    ],
  },
  specifiedCommercialTransactions: {
    slug: 'specified-commercial-transactions',
    title: 'Specified Commercial Transactions',
    description: 'Notification based on the Specified Commercial Transactions Act for Artbar Tokyo.',
    sections: [
      {
        language: 'English',
        eyebrow: 'Legal Notice',
        title: 'Notification based on the Specified Commercial Transactions Act',
        blocks: [
          {
            fields: [
              { label: 'Legal Name', value: 'Paint Garage LLC' },
              { label: 'Address', value: '7-2 Daikanyama-cho, Shibuya-ku, Tokyo 〒150-0034' },
              { label: 'Phone number', value: '03-6455-3329' },
              { label: 'Email address', value: 'artbar.tokyo@gmail.com' },
              { label: 'Director of operations', value: 'Uehira Toyohisa' },
              { label: 'CEO', value: 'Cathy Thompson' },
              { label: 'Exchanges & Returns', value: 'Cancellations made 72 hours or more before the start of the event are eligible for a 100% refund. Cancellations made within 24 to 72 hours before the start of the event are eligible for a 75% refund. Cancellations made within 24 hours before the start time are not eligible for a refund.' },
              { label: 'Delivery times', value: 'Orders will be processed immediately, and ticket numbers should be received within one hour after purchase via email.' },
              { label: 'Accepted payment methods', value: 'We accept payment via credit cards and PayPay.' },
              { label: 'Payment period', value: 'Credit card and PayPay payments are processed immediately.' },
              { label: 'Average value', value: '5000 JPY' },
              { label: 'Cut off time', value: 'Payments accepted up to one hour before the scheduled event.' },
              { label: 'Available quantity', value: 'Limited seats available. Please plan ahead to ensure enough seats for your party.' },
            ],
          },
        ],
      },
      {
        language: '日本語',
        eyebrow: '特定商取引法に基づく表記',
        title: '会社概要',
        blocks: [
          {
            fields: [
              { label: '社名', value: 'ペイント・ガレージ・エルエルシー' },
              { label: '住所', value: '〒150-0034 東京都渋谷区代官山町 7-2' },
              { label: '創業', value: '2016年11月' },
              { label: '代表', value: '上平豊久' },
              { label: 'CEO', value: 'キャシー・トンプソン' },
              { label: '電話番号', value: '03-6455-3329' },
              { label: 'メールアドレス', value: 'artbar.tokyo@gmail.com' },
              { label: '返品・交換', value: 'イベント開始時間の72時間前までのキャンセルは、100%返金の対象となります。開始時間の24時間前から72時間前までのキャンセルは、75%返金の対象となります。開始時間の24時間前を過ぎてからのキャンセルは、返金の対象外となります。' },
              { label: '引渡時期', value: 'ご注文は即時処理され、購入後1時間以内にメールでチケット番号を受信できます。' },
              { label: '支払方法', value: 'クレジットカード、PayPay' },
              { label: '支払時期', value: 'クレジットカードおよびPayPay決済は即時処理されます。' },
              { label: '平均価格', value: '5,000円' },
              { label: '申込締切', value: '開催予定時刻の1時間前までお支払いを受け付けます。' },
              { label: '販売数量', value: '座席数には限りがあります。グループでの参加をご希望の場合は、お早めにご予約ください。' },
            ],
          },
        ],
      },
    ],
  },
} satisfies Record<string, LegalPageContent>;
