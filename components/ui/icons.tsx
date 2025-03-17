import React from "react";

export function Left (props: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <path d="M665.66 230.356c14.165 14.163 14.165 37.126 0 51.289L435.307 511.999 665.66 742.356c14.165 14.161 14.165 37.124 0 51.29-14.161 14.161-37.124 14.161-51.29 0l-255.998-256c-14.163-14.165-14.163-37.129 0-51.29L614.37 230.355c14.165-14.163 37.129-14.163 51.29 0z" />
	  </svg>
	)
}

export function Right (props: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <path d="M358.372 230.356c-14.163 14.163-14.163 37.126 0 51.289l230.355 230.354-230.355 230.357c-14.163 14.161-14.163 37.124 0 51.29 14.163 14.161 37.126 14.161 51.289 0l255.999-256c14.165-14.165 14.165-37.129 0-51.29L409.661 230.355c-14.163-14.163-37.126-14.163-51.289 0z" />
	  </svg>
	)
}

export function Close (props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <title />
	    <path d="M793.66 281.646c14.165-14.163 14.165-37.126 0-51.289-14.161-14.163-37.124-14.163-51.285 0L512.018 460.711 281.662 230.357c-14.163-14.163-37.126-14.163-51.289 0s-14.163 37.126 0 51.289L460.728 512 230.373 742.357c-14.163 14.161-14.163 37.124 0 51.29 14.163 14.161 37.126 14.161 51.289 0L512.018 563.29l230.357 230.357c14.161 14.161 37.124 14.161 51.285 0 14.165-14.165 14.165-37.129 0-51.29L563.307 512 793.66 281.646z" />
	  </svg>
	);
}

export function CalendarIcon(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
	  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
	    <title />
	    <path d="M718.95 85.334c0-20.029-16.239-36.267-36.267-36.267-20.032 0-36.267 16.237-36.267 36.267v49.067H377.574V85.334c0-20.029-16.237-36.267-36.267-36.267S305.04 65.304 305.04 85.334v49.067h-91.692c-67.158 0-121.6 54.442-121.6 121.6v597.332c0 67.157 54.442 121.6 121.6 121.6h597.334c67.157 0 121.6-54.443 121.6-121.6V256.001c0-67.158-54.443-121.6-121.6-121.6h-91.733V85.334zm140.8 305.067H164.283v-134.4c0-27.098 21.968-49.067 49.067-49.067h91.692v49.067c0 20.03 16.237 36.267 36.267 36.267s36.267-16.237 36.267-36.267v-49.067h268.842v49.067c0 20.03 16.235 36.267 36.267 36.267 20.028 0 36.267-16.237 36.267-36.267v-49.067h91.733c27.098 0 49.067 21.968 49.067 49.067v134.4zm-695.467 72.532H859.75v390.4c0 27.102-21.969 49.067-49.067 49.067H213.349c-27.099 0-49.067-21.965-49.067-49.067v-390.4z" />
	  </svg>
	)
}

export function Down(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
		<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={"lucide lucide-chevron-down " + (props.className ?? "")}
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
	)
}
export function SearchIcon(props: React.HTMLAttributes<HTMLOrSVGElement>){
	return (
		<svg
	    xmlns="http://www.w3.org/2000/svg"
	    width={20}
	    height={20}
	    fill="none"
	    {...props}
	  >
	    <path
	      stroke="#7B8DA3"
	      strokeLinecap="round"
	      strokeLinejoin="round"
	      strokeWidth={1.667}
	      d="M9.167 15.833a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM18.333 18.333l-4.458-4.458"
	    />
	  </svg>
	)
}

export function Plus(props: React.HTMLAttributes<HTMLOrSVGElement>){
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path 
        d="M10 5V15" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M5 10H15" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Check(props: React.HTMLAttributes<HTMLOrSVGElement>){
  return(

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path d="M1.78564 5.76397L5.08565 9.06398L11.2137 2.93555" stroke="currentColor" strokeWidth="1.33333"/>
  </svg>
  )
}

export function Products(props: React.HTMLAttributes<HTMLOrSVGElement>){
  return(
    <svg 
      width="21" 
      height="20" 
      viewBox="0 0 21 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M3 5.00002L5.5 1.66669H15.5L18 5.00002M3 5.00002V16.6667C3 17.1087 3.17559 17.5326 3.48816 17.8452C3.80072 18.1578 4.22464 18.3334 4.66667 18.3334H16.3333C16.7754 18.3334 17.1993 18.1578 17.5118 17.8452C17.8244 17.5326 18 17.1087 18 16.6667V5.00002M3 5.00002H18M13.8333 8.33335C13.8333 9.21741 13.4821 10.0653 12.857 10.6904C12.2319 11.3155 11.3841 11.6667 10.5 11.6667C9.61595 11.6667 8.7681 11.3155 8.14298 10.6904C7.51786 10.0653 7.16667 9.21741 7.16667 8.33335" 
        stroke="currentColor" 
        strokeWidth="1.41667" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}



export function OrdersIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M17.182 15.3575V2.93937C17.182 2.0189 16.4358 1.27271 15.5153 1.27271H2.48503C1.56455 1.27271 0.818359 2.0189 0.818359 2.93937V15.3575C0.818359 16.278 1.56455 17.0242 2.48503 17.0242H15.5153C16.4358 17.0242 17.182 16.278 17.182 15.3575Z" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.9738 1.23169V7.52259L9.02082 6.21463L7.06787 7.52259V1.23169" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.36768 11.8359H6.20916" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.36768 14.3108H10.8186" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PaymentsIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <circle cx="10.6668" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667"/>
      <path d="M12.7502 8.10757C12.7502 8.10757 12.7502 7.46941 12.2995 6.92916C11.6863 6.24077 10.3455 6.39886 10.0716 6.4409C9.79764 6.48294 9.29842 6.6165 9.01935 6.92906C8.74028 7.24162 8.5835 7.66554 8.5835 8.10757C8.5835 8.54959 8.7436 8.83029 9.02267 9.14285C9.30174 9.45541 9.84462 9.70459 10.6668 10.0022C11.489 10.2998 12.0319 10.549 12.311 10.8616C12.5901 11.1741 12.7502 11.4548 12.7502 11.8969C12.7502 12.3389 12.5934 12.7628 12.3143 13.0754C12.0352 13.3879 11.536 13.5215 11.2621 13.5635C10.9881 13.6056 9.64741 13.7637 9.03418 13.0753C8.5835 12.535 8.5835 11.8969 8.5835 11.8969M10.6668 5.41675V6.3954M10.6668 13.6041V14.5834" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProfitIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path d="M11.6082 6.95996C11.1311 7.30004 10.5474 7.50008 9.91691 7.50008C8.30608 7.50008 7.00024 6.19425 7.00024 4.58341C7.00024 2.97258 8.30608 1.66675 9.91691 1.66675C10.9611 1.66675 11.8771 2.21543 12.3923 3.0402M5.33358 16.7394H7.50882C7.79243 16.7394 8.07431 16.7731 8.34925 16.8406L10.6477 17.3991C11.1464 17.5206 11.6659 17.5325 12.1698 17.4346L14.7111 16.9402C15.3824 16.8094 15.9999 16.488 16.4839 16.0172L18.2818 14.2682C18.7953 13.7695 18.7953 12.9604 18.2818 12.461C17.8195 12.0113 17.0875 11.9607 16.5645 12.342L14.4691 13.8708C14.169 14.0902 13.8038 14.2083 13.4283 14.2083H11.4048L12.6928 14.2082C13.4187 14.2082 14.0068 13.6362 14.0068 12.93V12.6744C14.0068 12.088 13.5965 11.5767 13.012 11.435L11.0241 10.9515C10.7006 10.8731 10.3692 10.8334 10.0362 10.8334C9.23219 10.8334 7.77682 11.4991 7.77682 11.4991L5.33358 12.5208M17.0002 5.41675C17.0002 7.02758 15.6944 8.33342 14.0836 8.33342C12.4727 8.33342 11.1669 7.02758 11.1669 5.41675C11.1669 3.80592 12.4727 2.50008 14.0836 2.50008C15.6944 2.50008 17.0002 3.80592 17.0002 5.41675ZM2.00024 12.1667L2.00024 17.0001C2.00024 17.4668 2.00024 17.7001 2.09107 17.8784C2.17097 18.0352 2.29845 18.1627 2.45525 18.2426C2.63351 18.3334 2.86687 18.3334 3.33358 18.3334H4.00024C4.46695 18.3334 4.70031 18.3334 4.87857 18.2426C5.03537 18.1627 5.16286 18.0352 5.24275 17.8784C5.33358 17.7001 5.33358 17.4668 5.33358 17.0001V12.1667C5.33358 11.7 5.33358 11.4667 5.24275 11.2884C5.16286 11.1316 5.03537 11.0041 4.87857 10.9242C4.70031 10.8334 4.46695 10.8334 4.00024 10.8334L3.33358 10.8334C2.86687 10.8334 2.63351 10.8334 2.45525 10.9242C2.29845 11.0041 2.17097 11.1316 2.09107 11.2884C2.00024 11.4667 2.00024 11.7 2.00024 12.1667Z" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}


export function PendingIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10.0001" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeDasharray="3.33 3.33"/>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.41667"/>
    </svg>
  )
}

export function AwaitingPaymentIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <circle cx="10.6668" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeDasharray="3.33 3.33"/>
      <path d="M12.7502 8.27945C12.7502 8.27945 12.7502 7.6993 12.2995 7.20817C11.6863 6.58236 10.3455 6.72608 10.0716 6.7643C9.79764 6.80252 9.29842 6.92393 9.01935 7.20808C8.74028 7.49222 8.5835 7.87761 8.5835 8.27945C8.5835 8.68129 8.7436 8.93647 9.02267 9.22062C9.30174 9.50476 9.84462 9.73129 10.6668 10.0019C11.489 10.2724 12.0319 10.499 12.311 10.7831C12.5901 11.0673 12.7502 11.3224 12.7502 11.7243C12.7502 12.1261 12.5934 12.5115 12.3143 12.7956C12.0352 13.0798 11.536 13.2012 11.2621 13.2394C10.9881 13.2776 9.64741 13.4214 9.03418 12.7956C8.5835 12.3044 8.5835 11.7243 8.5835 11.7243M10.6668 5.83325V6.72294M10.6668 13.2763V14.1666" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ShippedIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none" {...props}>
      <path d="M1.2915 3.2771V13.5758C1.2915 14.0658 1.68878 14.4631 2.17884 14.4631H18.4882C18.9783 14.4631 19.3755 14.0658 19.3755 13.5758V7.83672C19.3755 7.72124 19.353 7.60688 19.3092 7.50004L17.8032 3.82775C17.6666 3.49464 17.3422 3.2771 16.9822 3.2771H13.1296" stroke="currentColor" strokeWidth="1.33318"/>
      <path d="M18.5056 5.92456H15.6948V9.63955H19.3754" stroke="currentColor" strokeWidth="1.24986" strokeLinejoin="round"/>
      <path d="M13.1184 10.4484V11.115C13.4866 11.115 13.785 10.8166 13.785 10.4484H13.1184ZM1.2915 10.4484H0.624914V11.115H1.2915V10.4484ZM2.17884 2.14608H12.2311V0.812902H2.17884V2.14608ZM12.4518 2.36683V10.4484H13.785V2.36683H12.4518ZM1.95809 10.4484V2.36683H0.624914V10.4484H1.95809ZM13.1184 9.78184H7.20496V11.115H13.1184V9.78184ZM7.20496 9.78184H1.2915V11.115H7.20496V9.78184ZM12.2311 2.14608C12.353 2.14608 12.4518 2.24491 12.4518 2.36683H13.785C13.785 1.50862 13.0893 0.812902 12.2311 0.812902V2.14608ZM2.17884 0.812902C1.32063 0.812902 0.624914 1.50862 0.624914 2.36683H1.95809C1.95809 2.24491 2.05693 2.14608 2.17884 2.14608V0.812902Z" fill="currentColor"/>
      <path d="M6.8603 14.4632C6.8603 15.2314 6.23751 15.8542 5.46926 15.8542C4.701 15.8542 4.07821 15.2314 4.07821 14.4632C4.07821 13.6949 4.701 13.0721 5.46926 13.0721C6.23751 13.0721 6.8603 13.6949 6.8603 14.4632Z" fill="white" stroke="currentColor" strokeWidth="1.33318"/>
      <path d="M16.7509 14.4632C16.7509 15.2314 16.1281 15.8542 15.3599 15.8542C14.5916 15.8542 13.9688 15.2314 13.9688 14.4632C13.9688 13.6949 14.5916 13.0721 15.3599 13.0721C16.1281 13.0721 16.7509 13.6949 16.7509 14.4632Z" fill="white" stroke="currentColor" strokeWidth="1.33318"/>
    </svg>
  )
}

export function DeliveredIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10.0001" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round"/>
      <path d="M14.1665 7.5L9.1665 12.5L6.6665 10" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function CanceledIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10.0001" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeDasharray="3.33 3.33"/>
      <path d="M10 10L12.5 7.5M10 10L7.5 12.5M10 10L12.5 12.5M10 10L7.5 7.5" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function FailedIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10.0001" cy="10.0001" r="8.33333" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeDasharray="3.33 3.33"/>
      <path d="M7.49992 10.6249L5.83325 8.54159L7.49992 6.45825" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.83325 8.5415H11.6666C13.0473 8.5415 14.1666 9.66079 14.1666 11.0415V11.0415C14.1666 12.4222 13.0473 13.5415 11.6666 13.5415H9.99992" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function Refresh(props: React.HTMLAttributes<HTMLOrSVGElement>) {
 return (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
     <path d="M0.833496 3.3335V8.3335H5.8335" stroke="currentColor" strokeWidth="1.34583" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M19.1665 16.6665V11.6665H14.1665" stroke="currentColor" strokeWidth="1.34583" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M17.0752 7.49998C16.6525 6.30564 15.9342 5.23782 14.9873 4.39616C14.0403 3.55451 12.8956 2.96645 11.6599 2.68686C10.4242 2.40727 9.13787 2.44527 7.92084 2.79729C6.70381 3.14932 5.59579 3.80391 4.70016 4.69998L0.833496 8.33331M19.1668 11.6666L15.3002 15.3C14.4045 16.1961 13.2965 16.8506 12.0795 17.2027C10.8625 17.5547 9.57609 17.5927 8.3404 17.3131C7.10472 17.0335 5.96 16.4455 5.01305 15.6038C4.06611 14.7621 3.3478 13.6943 2.92516 12.5" stroke="currentColor" strokeWidth="1.34583" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
 )
}
