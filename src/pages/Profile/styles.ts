import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    > header {
        height: 144px;
        background-color: #28262e;
        display: flex;
        align-items: center;

        div {
            max-width: 1120px;
            margin: 0 auto;
            width: 100%;

            svg {
                color: #999591;
                width: 24px;
                height: 24px;
                transition: 0.2s;

                &:hover {
                    color: ${shade(0.2, '#999591')};
                }
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -170px 0 auto;
    width: 100%;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        a {
            color: #f4ede8;
            display: block;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background-color: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: ${shade(0.2, '#ff9000')};
        }

        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }

        input {
            display: none;
        }
    }
`;
