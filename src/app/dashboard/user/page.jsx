import { getDeliveryOrder } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import UserOverview from './UserOverview';


const DashboardUser = async () => {
    const { user } = await getUserSession();
      
    // Fetch user's orders
    const myOrder = await getDeliveryOrder(user?.id);

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
 
            <UserOverview orders={myOrder} />
        </div>
    );
};

export default DashboardUser;