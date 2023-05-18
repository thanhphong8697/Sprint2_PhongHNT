package com.example.tproyalbe.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final String jwtSecret = "anhquan1301";
    private int jwtExpiration = 86400;

    /**
     * QuanNLA
     * DATE 24/04/2023
     * JWT generation method
     * @param authentication
     * @return the generated JWT string.
     */
    public String createToken(Authentication authentication){
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return Jwts.builder().setSubject(userPrinciple.getUsername()).setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * QuanNLA
     * DATE 24/04/2023
     * Method used to validate JWT . string
     * @param token
     * @return If no error occurs, the method returns true to validate the JWT string. Else return false
     */
    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e){

            logger.error("Chữ ký JWT không hợp lệ ->Message: {}", e);
        } catch (MalformedJwtException e){
            logger.error("Token không đúng định dạng ->Message: {}",e);
        } catch (UnsupportedJwtException e){
            logger.error("Token không được hổ trợ ->Message: {}",e);
        } catch (ExpiredJwtException e){
            logger.error("Chuỗi Token đã hết hạn -> Message: {}",e);
        } catch (IllegalArgumentException e){
            logger.error("Chuỗi Token không được bỏ trống -> Message {}",e);
        }
        return false;
    }

    /**
     * QuanNLA
     * DATE 24/04/2023
     * method used to get username from JWT string
     * @param token
     * @return username is taken from the JWT string
     */
    public String getUserNameFromToken(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

}
