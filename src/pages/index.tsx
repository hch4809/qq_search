import * as React from 'react';
import { useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (): any => {
    const [search, setSearch] = useState<string>('');

    return (
        <div>{search}</div>
    )
}