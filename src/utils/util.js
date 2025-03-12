export const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-500'; 
      case 'Rejected':
        return 'text-red-500';
      case 'Pending':
        return 'text-orange-500'; 
      default:
        return 'text-gray-500'; 
    }
  };