import React from 'react';

interface CategoryIconProps {
  iconType: string;
  className?: string;
}

export function CategoryIcon({ iconType, className = '' }: CategoryIconProps) {
  const icons: { [key: string]: React.ReactElement } = {
    all: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="1.375" y="1.375" width="6.083" height="6.083" rx="0.958" stroke="currentColor" strokeWidth="1.42"/>
        <rect x="1.375" y="10.542" width="6.083" height="6.083" rx="0.958" stroke="currentColor" strokeWidth="1.42"/>
        <rect x="10.542" y="1.375" width="6.083" height="6.083" rx="0.958" stroke="currentColor" strokeWidth="1.42"/>
        <rect x="10.542" y="10.542" width="6.083" height="6.083" rx="0.958" stroke="currentColor" strokeWidth="1.42"/>
      </svg>
    ),
    
    accessories: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1.667 6.981C1.667 6.689 1.667 6.543 1.679 6.42C1.796 5.234 2.734 4.296 3.92 4.179C4.043 4.167 4.197 4.167 4.505 4.167C4.623 4.167 4.683 4.167 4.733 4.163C5.376 4.125 5.938 3.719 6.179 3.122C6.197 3.075 6.215 3.022 6.25 2.917C6.285 2.811 6.303 2.758 6.322 2.712C6.562 2.114 7.125 1.708 7.767 1.67C7.818 1.667 7.873 1.667 7.984 1.667H12.016C12.127 1.667 12.183 1.667 12.233 1.67C12.876 1.708 13.438 2.114 13.679 2.712C13.697 2.758 13.715 2.811 13.75 2.917C13.785 3.022 13.803 3.075 13.822 3.122C14.062 3.719 14.625 4.125 15.267 4.163C15.318 4.167 15.377 4.167 15.495 4.167C15.803 4.167 15.957 4.167 16.08 4.179C17.266 4.296 18.204 5.234 18.321 6.42C18.333 6.543 18.333 6.689 18.333 6.981V13.5C18.333 14.9 18.333 15.6 18.061 16.135C17.821 16.605 17.439 16.988 16.968 17.227C16.434 17.5 15.734 17.5 14.333 17.5H5.667C4.267 17.5 3.567 17.5 3.032 17.227C2.561 16.988 2.179 16.605 1.939 16.135C1.667 15.6 1.667 14.9 1.667 13.5V6.981Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 13.75C11.841 13.75 13.333 12.258 13.333 10.417C13.333 8.576 11.841 7.083 10 7.083C8.159 7.083 6.667 8.576 6.667 10.417C6.667 12.258 8.159 13.75 10 13.75Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    furniture: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8334 7.50016V5.00016C15.8334 4.55814 15.6578 4.13421 15.3453 3.82165C15.0327 3.50909 14.6088 3.3335 14.1667 3.3335H5.83341C5.39139 3.3335 4.96746 3.50909 4.6549 3.82165C4.34234 4.13421 4.16675 4.55814 4.16675 5.00016V7.50016" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 13.3333C2.5 13.7754 2.67559 14.1993 2.98816 14.5118C3.30072 14.8244 3.72464 15 4.16667 15H15.8333C16.2754 15 16.6993 14.8244 17.0118 14.5118C17.3244 14.1993 17.5 13.7754 17.5 13.3333V9.16667C17.5 8.72464 17.3244 8.30072 17.0118 7.98816C16.6993 7.6756 16.2754 7.5 15.8333 7.5C15.3913 7.5 14.9674 7.6756 14.6548 7.98816C14.3423 8.30072 14.1667 8.72464 14.1667 9.16667V10.4167C14.1667 10.5272 14.1228 10.6332 14.0446 10.7113C13.9665 10.7894 13.8605 10.8333 13.75 10.8333H6.25C6.13949 10.8333 6.03351 10.7894 5.95537 10.7113C5.87723 10.6332 5.83333 10.5272 5.83333 10.4167V9.16667C5.83333 8.72464 5.65774 8.30072 5.34518 7.98816C5.03262 7.6756 4.60869 7.5 4.16667 7.5C3.72464 7.5 3.30072 7.6756 2.98816 7.98816C2.67559 8.30072 2.5 8.72464 2.5 9.16667V13.3333Z" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16675 15V16.6667" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.8333 15V16.6667" stroke="currentColor" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
     
    ),
    
    clothing: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M16.983 2.883L13.333 1.667C13.333 2.551 12.982 3.398 12.357 4.024C11.732 4.649 10.884 5 10 5C9.116 5 8.268 4.649 7.643 4.024C7.018 3.398 6.667 2.551 6.667 1.667L3.017 2.883C2.639 3.009 2.32 3.265 2.115 3.606C1.91 3.947 1.834 4.349 1.9 4.742L2.383 7.633C2.415 7.829 2.516 8.007 2.667 8.135C2.818 8.264 3.01 8.334 3.208 8.333H5V16.667C5 17.583 5.75 18.333 6.667 18.333H13.333C13.775 18.333 14.199 18.158 14.512 17.845C14.824 17.533 15 17.109 15 16.667V8.333H16.792C16.99 8.334 17.182 8.264 17.333 8.135C17.484 8.007 17.585 7.829 17.617 7.633L18.1 4.742C18.166 4.349 18.09 3.947 17.885 3.606C17.68 3.265 17.36 3.009 16.983 2.883Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    home: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M13.333 1.667H3.333C2.413 1.667 1.667 2.413 1.667 3.333V5C1.667 5.92 2.413 6.667 3.333 6.667H13.333C14.254 6.667 15 5.92 15 5V3.333C15 2.413 14.254 1.667 13.333 1.667Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.333 13.333V11.667C8.333 11.225 8.509 10.801 8.821 10.488C9.134 10.175 9.558 10 10 10H16.667C17.109 10 17.533 9.824 17.845 9.512C18.158 9.199 18.333 8.775 18.333 8.333V5.833C18.333 5.391 18.158 4.967 17.845 4.655C17.533 4.342 17.109 4.167 16.667 4.167H15" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.167 13.333H7.5C7.04 13.333 6.667 13.707 6.667 14.167V17.5C6.667 17.96 7.04 18.333 7.5 18.333H9.167C9.627 18.333 10 17.96 10 17.5V14.167C10 13.707 9.627 13.333 9.167 13.333Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    kids: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7.5 10H7.508" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 10H12.508" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.333 13.333C8.75 13.583 9.333 13.75 10 13.75C10.667 13.75 11.25 13.583 11.667 13.333" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.833 5.25C16.588 6.196 17.103 7.311 17.333 8.5C17.615 8.636 17.853 8.85 18.019 9.115C18.185 9.38 18.274 9.687 18.274 10C18.274 10.313 18.185 10.62 18.019 10.885C17.853 11.15 17.615 11.364 17.333 11.5C16.974 13.178 16.049 14.682 14.715 15.76C13.38 16.839 11.716 17.428 10 17.428C8.284 17.428 6.62 16.839 5.285 15.76C3.951 14.682 3.027 13.178 2.667 11.5C2.385 11.364 2.147 11.15 1.981 10.885C1.815 10.62 1.727 10.313 1.727 10C1.727 9.687 1.815 9.38 1.981 9.115C2.147 8.85 2.385 8.636 2.667 8.5C3.012 6.809 3.93 5.288 5.266 4.195C6.602 3.102 8.274 2.503 10 2.5C11.667 2.5 12.917 3.417 12.917 4.583C12.917 5.75 12.167 6.667 11.25 6.667C10.583 6.667 10 6.333 10 5.833" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    jewelry: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 2.5H15L18.333 7.5L10 18.333L1.667 7.5L5 2.5Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.167 2.5L6.667 7.5L10 18.333L13.333 7.5L10.833 2.5" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.667 7.5H18.333" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    pets: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M9.167 5C10.087 5 10.833 4.254 10.833 3.333C10.833 2.413 10.087 1.667 9.167 1.667C8.246 1.667 7.5 2.413 7.5 3.333C7.5 4.254 8.246 5 9.167 5Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 8.333C15.92 8.333 16.667 7.587 16.667 6.667C16.667 5.746 15.92 5 15 5C14.08 5 13.333 5.746 13.333 6.667C13.333 7.587 14.08 8.333 15 8.333Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.667 15C17.587 15 18.333 14.254 18.333 13.333C18.333 12.413 17.587 11.667 16.667 11.667C15.746 11.667 15 12.413 15 13.333C15 14.254 15.746 15 16.667 15Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 8.333C8.047 8.333 8.589 8.441 9.095 8.651C9.6 8.86 10.06 9.167 10.446 9.554C10.833 9.941 11.14 10.4 11.35 10.906C11.559 11.411 11.667 11.953 11.667 12.5V15.417C11.667 16.114 11.417 16.788 10.963 17.317C10.508 17.845 9.88 18.194 9.191 18.299C8.502 18.404 7.798 18.259 7.206 17.89C6.615 17.521 6.175 16.953 5.967 16.288C5.611 15.14 4.861 14.389 3.717 14.033C3.052 13.825 2.484 13.386 2.115 12.795C1.746 12.204 1.6 11.5 1.705 10.812C1.81 10.123 2.158 9.494 2.686 9.04C3.214 8.585 3.887 8.335 4.583 8.333H7.5Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    electronics: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M15 6.667V5C15 4.558 14.824 4.134 14.512 3.822C14.199 3.509 13.775 3.333 13.333 3.333H3.333C2.891 3.333 2.467 3.509 2.155 3.822C1.842 4.134 1.667 4.558 1.667 5V10.833C1.667 11.276 1.842 11.699 2.155 12.012C2.467 12.325 2.891 12.5 3.333 12.5H10" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.333 15.833V12.533V15.158" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.833 15.833H10" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.667 10H15C14.079 10 13.333 10.746 13.333 11.667V16.667C13.333 17.587 14.079 18.333 15 18.333H16.667C17.587 18.333 18.333 17.587 18.333 16.667V11.667C18.333 10.746 17.587 10 16.667 10Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    toys: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 9.167H8.333" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.667 7.5V10.833" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 10H12.508" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 8.333H15.008" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.433 4.167H5.567C4.742 4.167 3.947 4.473 3.334 5.025C2.722 5.578 2.336 6.338 2.252 7.158C2.247 7.202 2.243 7.242 2.238 7.285C2.17 7.847 1.667 12.047 1.667 13.333C1.667 13.996 1.93 14.632 2.399 15.101C2.868 15.57 3.504 15.833 4.167 15.833C5 15.833 5.417 15.417 5.833 15L7.012 13.822C7.324 13.509 7.748 13.333 8.19 13.333H11.81C12.252 13.333 12.676 13.509 12.988 13.822L14.167 15C14.583 15.417 15 15.833 15.833 15.833C16.497 15.833 17.132 15.57 17.601 15.101C18.07 14.632 18.333 13.996 18.333 13.333C18.333 12.046 17.83 7.847 17.763 7.285C17.757 7.243 17.753 7.202 17.748 7.159C17.664 6.338 17.279 5.578 16.666 5.026C16.054 4.473 15.258 4.167 14.433 4.167Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    computers: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5.833 14.167L6.238 16.19C6.391 16.953 6.467 17.335 6.666 17.62C6.842 17.872 7.084 18.071 7.366 18.194C7.685 18.333 8.074 18.333 8.853 18.333H11.147C11.926 18.333 12.315 18.333 12.635 18.194C12.916 18.071 13.158 17.872 13.334 17.62C13.533 17.335 13.609 16.953 13.762 16.19L14.167 14.167M5.833 5.833L6.238 3.81C6.391 3.047 6.467 2.665 6.666 2.379C6.842 2.127 7.084 1.929 7.366 1.806C7.685 1.667 8.074 1.667 8.853 1.667H11.147C11.926 1.667 12.315 1.667 12.635 1.806C12.916 1.929 13.158 2.127 13.334 2.379C13.533 2.665 13.609 3.047 13.762 3.81L14.167 5.833M10 7.5V10L11.25 11.25M15.833 10C15.833 13.222 13.222 15.833 10 15.833C6.778 15.833 4.167 13.222 4.167 10C4.167 6.778 6.778 4.167 10 4.167C13.222 4.167 15.833 6.778 15.833 10Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    luggage: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 16.667C4.558 16.667 4.134 16.491 3.821 16.179C3.509 15.866 3.333 15.442 3.333 15V6.667C3.333 6.225 3.509 5.801 3.821 5.488C4.134 5.176 4.558 5 5 5H15C15.442 5 15.866 5.176 16.178 5.488C16.491 5.801 16.667 6.225 16.667 6.667V15C16.667 15.442 16.491 15.866 16.178 16.179C15.866 16.491 15.442 16.667 15 16.667" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.667 15V3.333C6.667 2.891 6.842 2.467 7.155 2.155C7.467 1.842 7.891 1.667 8.333 1.667H11.667C12.109 1.667 12.533 1.842 12.845 2.155C13.158 2.467 13.333 2.891 13.333 3.333V15" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.333 16.667H11.667" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.333 18.333C14.254 18.333 15 17.587 15 16.667C15 15.746 14.254 15 13.333 15C12.413 15 11.667 15.746 11.667 16.667C11.667 17.587 12.413 18.333 13.333 18.333Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.667 18.333C7.587 18.333 8.333 17.587 8.333 16.667C8.333 15.746 7.587 15 6.667 15C5.746 15 5 15.746 5 16.667C5 17.587 5.746 18.333 6.667 18.333Z" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    default: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  };

  return icons[iconType] || icons.default;
}
