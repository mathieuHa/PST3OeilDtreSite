<?php
/**
 * Created by PhpStorm.
 * User: kafim
 * Date: 26/02/2017
 * Time: 12:19
 */

namespace DTRE\OeilSiteBundle\Entity;


use FOS\UserBundle\Model\Group as BaseGroup;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_group")
 */
class Group extends BaseGroup
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

}
